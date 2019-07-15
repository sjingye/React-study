import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from '../views/Login/index.jsx';
import Logup from '../views/Logup/index.jsx';

const ChildRoutes = [
  // 角色管理
  // {
  //   path: '/auth/role',
  //   component: Role,
  //   requiresAuth: false,
  // },
];

const AppRouter = () => {
  return (
    <Switch>
      <Route component={Login} path="/login" />
      <Route component={Logup} path="/logup" />
    </Switch>
  )
}

export default withRouter(AppRouter);
export { ChildRoutes };