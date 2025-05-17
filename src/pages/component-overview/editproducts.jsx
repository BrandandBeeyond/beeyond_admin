import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Stack,
  Card,
  CardMedia,
} from '@mui/material';
import { FileAddOutlined } from '@ant-design/icons';
import { TextareaAutosize } from '@mui/base';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../../redux/actions/ProductAction';


const MAX_IMAGES = 5;

const EditProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const product = products[0] || {}; // Assuming first product
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    originalPrice: '',
    sellingPrice: '',
    stock: '',
  });

  const [existingImages, setExistingImages] = useState([]);
  const [imageInputs, setImageInputs] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        originalPrice: product.cuttedPrice || '',
        sellingPrice: product.price || '',
        stock: product.stock || '',
      });
      setExistingImages(product.images || []);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddImageField = () => {
    const totalImages = existingImages.length + imageInputs.length;
    if (totalImages < MAX_IMAGES) {
      setImageInputs([...imageInputs, { id: Date.now(), file: null, preview: null }]);
    } else {
      alert(`You can upload maximum ${MAX_IMAGES} images.`);
    }
  };

  const handleImageChange = (e, id) => {
    const file = e.target.files[0];
    const preview = file ? URL.createObjectURL(file) : null;

    setImageInputs((prev) =>
      prev.map((img) => (img.id === id ? { ...img, file, preview } : img))
    );
  };

  const handleSubmit = async () => {
    if (!product._id) {
      alert('No product selected');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.sellingPrice);
    data.append('cuttedPrice', formData.originalPrice);
    data.append('stock', formData.stock);
    data.append('category', formData.category);

    imageInputs.forEach((imgObj) => {
      if (imgObj.file) {
        data.append('images', imgObj.file);
      }
    });

    dispatch(updateProduct(product._id, data));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Edit Product
      </Typography>

      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* Product Form Fields */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product Title"
              variant="outlined"
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product Category"
              variant="outlined"
              margin="normal"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Original Price"
              variant="outlined"
              margin="normal"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Selling Price"
              variant="outlined"
              margin="normal"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product Stock"
              variant="outlined"
              margin="normal"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={5}
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </Grid>

          {/* Existing Images */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Existing Images
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {existingImages.map((img, index) => (
                <Card key={index} sx={{ width: 150, height: 150 }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={img.url}
                    alt={`Existing Product ${index}`}
                  />
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Upload New Images */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Upload New Images
            </Typography>
            <Stack spacing={2}>
              {imageInputs.map((imgInput) => (
                <Box key={imgInput.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, imgInput.id)} />
                  {imgInput.preview && (
                    <Box
                      component="img"
                      src={imgInput.preview}
                      alt="Preview"
                      sx={{ width: 100, height: 100, borderRadius: 1, objectFit: 'cover' }}
                    />
                  )}
                </Box>
              ))}
              <Button
                variant="outlined"
                startIcon={<FileAddOutlined />}
                onClick={handleAddImageField}
                disabled={existingImages.length + imageInputs.length >= MAX_IMAGES}
              >
                Add More Images
              </Button>
            </Stack>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Update Product
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EditProducts;
