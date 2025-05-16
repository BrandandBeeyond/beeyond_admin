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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/actions/ProductAction';

const headCells = [
  { id: 'product title', align: 'left', label: 'product title' },
  { id: 'description', align: 'left', label: 'description' },
  { id: 'product category', align: 'left', label: 'category' },
  { id: 'product price', align: 'left', label: 'price' },
  { id: 'product image', align: 'left', label: 'image' },
  { id: 'action', align: 'left', label: 'action' }
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

const Manageproducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    console.log('products', products);
    dispatch(fetchAllProducts());
  }, [dispatch]);

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
                  ) : products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6}>No products found</TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>₹{product.price}</TableCell>
                        <TableCell>
                          <img src={{uri:product.image[0].url}} alt={product.name} width="60" height="60" style={{ objectFit: 'cover' }} />
                        </TableCell>{' '}
                        {/* image */}
                        <TableCell>
                          <Button variant="contained" size="small" color="primary" sx={{ mr: 1 }}>
                            Edit
                          </Button>
                          <Button variant="outlined" size="small" color="error">
                            Delete
                          </Button>
                        </TableCell>{' '}
                        {/* action */}
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
};

export default Manageproducts;
