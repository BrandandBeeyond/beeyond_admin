// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  ProductOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  ProductOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const orders = {
  id: 'orders',
  title: 'Orders',
  type: 'group',
  children: [
   {
      id: 'util-shadow',
      title: 'Manage Orders',
      type: 'item',
      url: '/orders',
      icon: icons.ProductOutlined
    }
  ]
};

export default orders;
