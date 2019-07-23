import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RouteHOC from '../components/authHOC.js';
import Login from '../views/Login/index.jsx';
// import Logup from '../views/Logup/index.jsx';

const ChildRoutes = [
    {
      path: '/login',
      title: '登录',
      component: Login,
      requiresAuth: false,
    },
    // {
    //   path: '/logup',
    //   title: '注册',
    //   component: Logup,
    //   requiresAuth: false,
    // },
];

/* 嵌套赋值例子
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj // {prop:123}
arr // [true]
*/
// BaseComponent嵌套赋值
function PrivateRoute({component: BaseComponent, ...rest}) {
    return (
        <Route {...rest} render={props => sessionStorage.getItem('username') ?
            <BaseComponent {...props} /> :
            <Redirect to={{ pathname: '/login', state: props.location }} />} />
    )
}
const AppRouter = () => {
    return (
        <Switch>
            {ChildRoutes.map(item => {
                return (item.requiresAuth ? 
                <PrivateRoute exact component={RouteHOC(item.component, item.title)} path={item.path} key={item.path} /> : 
                <Route exact component={RouteHOC(item.component, item.title)}  path={item.path} key={item.path} />)
            })}
        </Switch>
    )
}

export default AppRouter;
export { ChildRoutes };