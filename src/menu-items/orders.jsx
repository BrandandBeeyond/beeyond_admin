// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  DatabaseOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  DatabaseOutlined,
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
      icon: icons.DatabaseOutlined
    }
  ]
};

export default orders;
