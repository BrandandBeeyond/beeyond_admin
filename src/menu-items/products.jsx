// assets
import { ProductOutlined } from '@ant-design/icons';

// icons
const icons = {
  ProductOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const products = {
  id: 'products',
  title: 'products',
  type: 'group',
  children: [
    {
      id: 'util-shadow',
      title: 'Manage products',
      type: 'item',
      url: '/products',
      icon: icons.ProductOutlined
    }
  ]
};

export default products;
