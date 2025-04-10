import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../../redux/actions/OrderAction';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom'; // Import Link for hyperlink functionality

const Manage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  console.log(orders);
  
  const { loading, error } = useSelector((state) => state.orders); // Optional: handling loading and errors

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // Columns configuration for react-table
  const columns = React.useMemo(
    () => [
      {
        Header: 'User Name',
        accessor: 'name',
      },
      {
        Header: 'Order Number',
        accessor: 'orderNumber',
        Cell: ({ value }) => (
          <Link to={`/orders/${value}`} style={{ textDecoration: 'none' }}>
            {value}
          </Link>
        ),
      },
      {
        Header: 'Payment Status',
        accessor: 'paymentInfo.status',
      },
      {
        Header: 'Order Date',
        accessor: 'paidAt',
        Cell: ({ value }) => {
          const date = new Date(value);
          const months = [
            "January", "February", "March", "April", "May", "June", "July", 
            "August", "September", "October", "November", "December"
          ];
          const day = date.getDate();
          const month = months[date.getMonth()];
          return `${day} ${month}`;
        },
      },
      {
        Header: 'Order Status',
        accessor: 'orderStatus',
        Cell: ({ value }) => {
          // Conditionally apply the Bootstrap class based on status
          const statusClass = value === 'Paid' ? 'text-success' : 'text-success';
          return <span className={statusClass}>{value}</span>;
        },
      },
      {
        Header: 'Action',
        accessor: 'action',
      },
    ],
    []
  );

  // Initialize react-table with data and columns
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: orders,
  });

  const sizePerPageList = [2, 5, 10, 20, 50];

  // Show loading state or error message if data is not loaded yet
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4 className="header-title">Orders</h4>
              <p className="text-muted mb-0">Manage pending orders</p>
            </Card.Header>
            <CardBody>
              <table {...getTableProps()} className="table table-striped table-bordered">
                <thead>
                  {headerGroups.map((headerGroup, index) => (
                    <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column, idx) => (
                        <th key={idx} {...column.getHeaderProps()}>
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                      <tr key={rowIndex} {...row.getRowProps()}>
                        {row.cells.map((cell, cellIndex) => (
                          <td key={cellIndex} {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Manage;
