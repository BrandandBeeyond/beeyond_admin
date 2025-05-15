import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Stack,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { getOrders, updateOrderStatus } from '../../redux/actions/OrderAction';

const headCells = [
  { id: 'name', align: 'left', label: 'User Name' },
  { id: 'orderNumber', align: 'left', label: 'Order Number' },
  { id: 'paymentStatus', align: 'left', label: 'Payment Status' },
  { id: 'orderDate', align: 'left', label: 'Order Date' },
  { id: 'orderStatus', align: 'left', label: 'Order Status' },
  { id: 'action', align: 'left', label: 'Action' }
];

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ComponentShadow() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId, newStatus) => {
    await dispatch(updateOrderStatus(orderId, newStatus));
    dispatch(getOrders());
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard
          sx={{
            width: '100%',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ width: '100%' }}>
            <TableContainer
              sx={{
                width: '100vw', // Full viewport width
                marginLeft: '-24px', // Adjust if MainCard has padding
                marginRight: '-24px',
                overflowX: 'auto',
                '& td, & th': { whiteSpace: 'nowrap' }
              }}
            >
              <Table>
                <OrderTableHead />
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6}>Loading...</TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={6}>Error: {error}</TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order.name}</TableCell>
                        <TableCell>
                          <Link to={`/orders/${order.orderNumber}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                            {order.orderNumber}
                          </Link>
                        </TableCell>
                        <TableCell>{order.paymentInfo?.status || 'N/A'}</TableCell>
                        <TableCell>{order.paidAt ? formatDate(order.paidAt) : 'N/A'}</TableCell>
                        <TableCell>
                          <Typography color={order.orderStatus === 'Delivered' ? 'success.main' : 'text.primary'}>
                            {order.orderStatus}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {order.orderStatus !== 'Delivered' && order.orderStatus !== 'Cancelled' ? (
                            <FormControl size="small" fullWidth>
                              <Select value="" displayEmpty onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                                <MenuItem disabled value="">
                                  Change Status
                                </MenuItem>
                                {order.orderStatus === 'Processing' && <MenuItem value="Shipped">Proceed to Ship</MenuItem>}
                                {order.orderStatus === 'Shipped' && <MenuItem value="Out for Delivery">Proceed to Delivery</MenuItem>}
                                {order.orderStatus === 'Out for Delivery' && <MenuItem value="Delivered">Mark Delivered</MenuItem>}
                              </Select>
                            </FormControl>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              No Action
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
}

ComponentShadow.propTypes = {
  shadow: PropTypes.string
};
