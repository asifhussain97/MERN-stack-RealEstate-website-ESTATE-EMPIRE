import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserRouters from './user/UserRouter';

import AgentRouter from './Agent/AgentRouter';
import AdminRouter from './admin/AdminRouter';


const Routes: React.FC = () => {
    const userRoutes = UserRouters();
    
    const agentRoutes = AgentRouter();
    const adminRoutes = AdminRouter();
    const combinedRoutes: RouteObject[] = [...userRoutes, ...agentRoutes, ...adminRoutes];
  const router = createBrowserRouter(combinedRoutes);

  return <RouterProvider router={router} />;
};

export default Routes;