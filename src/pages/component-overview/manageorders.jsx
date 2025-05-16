import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// MUI
import {
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Menu,
  MenuItem
} from '@mui/material';

// Project imports
import MainCard from 'components/MainCard';
import { getOrders, updateOrderStatus } from '../../redux/actions/OrderAction';

// Table headers
const headCells = [
  { id: 'name', align: 'left', label: 'User Name' },
  { id: 'orderNumber', align: 'left', label: 'Order Number' },
  { id: 'paymentStatus', align: 'left', label: 'Payment Status' },
  { id: 'orderDate', align: 'left', label: 'Order Date' },
  { id: 'orderStatus', align: 'left', label: 'Order Status' },
  { id: 'changeStatus', align: 'left', label: 'Change Status' }
];

// Table head component
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

// Main component
export default function ComponentShadow() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  const [anchorEls, setAnchorEls] = useState({}); // Store anchor per order

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleMenuOpen = (event, orderId) => {
    setAnchorEls((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleMenuClose = (orderId) => {
    setAnchorEls((prev) => ({ ...prev, [orderId]: null }));
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    await dispatch(updateOrderStatus(orderId, newStatus));
    handleMenuClose(orderId);
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
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  return (
    <Grid container spacing={3}>
      <Grid span={12}>
        <MainCard sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ width: '100%' }}>
            <TableContainer
              sx={{
                width: '80vw',
                marginLeft: '-24px',
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
                  ) : orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6}>No orders found</TableCell>
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
                            <>
                              <Button variant="outlined" size="small" onClick={(e) => handleMenuOpen(e, order._id)}>
                                Change Status
                              </Button>
                              <Menu
                                anchorEl={anchorEls[order._id]}
                                open={Boolean(anchorEls[order._id])}
                                onClose={() => handleMenuClose(order._id)}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                              >
                                {order.orderStatus === 'Processing' && (
                                  <MenuItem onClick={() => handleStatusUpdate(order._id, 'Shipped')}>Proceed to Ship</MenuItem>
                                )}
                                {order.orderStatus === 'Shipped' && (
                                  <MenuItem onClick={() => handleStatusUpdate(order._id, 'Out for Delivery')}>Proceed to Delivery</MenuItem>
                                )}
                                {order.orderStatus === 'Out for Delivery' && (
                                  <MenuItem onClick={() => handleStatusUpdate(order._id, 'Delivered')}>Mark Delivered</MenuItem>
                                )}
                                <MenuItem onClick={() => handleStatusUpdate(order._id, 'Cancelled')} style={{ color: 'red' }}>
                                  Cancel Order
                                </MenuItem>
                              </Menu>
                            </>
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
