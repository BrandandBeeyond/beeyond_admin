import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const ManageOrders = Loadable(lazy(() => import('pages/component-overview/manageorders')));
const ManageProducts = Loadable(lazy(() => import('pages/component-overview/manageproducts')));
const EditProducts = Loadable(lazy(() => import('pages/component-overview/editproducts')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'products',
      element: <ManageProducts />
    },
    {
      path: 'editproducts',
      element: <EditProducts />
    },
    {
      path: 'orders',
      element: <ManageOrders />
    },
  
  ]
};

export default MainRoutes;
