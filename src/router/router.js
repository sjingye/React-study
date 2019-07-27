import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RouteHOC from 'components/authHOC.js';
import asyncComponent from 'components/asyncComponent.js';

const ChildRoutes = [
    {
      path: '/login',
      title: '登录',
      component: asyncComponent(() => import('views/Login/index.jsx')),
      requiresAuth: false,
    },
    {
      path: '/logup',
      title: '注册',
      component: asyncComponent(() => import('views/Logup/index.jsx')),
      requiresAuth: false,
    },
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
            {/* <Route exact component={asyncComponent(() => import('views/Logup/index.jsx'))}  path={'/logup'} key={1} />) */}
            <Redirect to="/" />
        </Switch>
    )
}

export default AppRouter;
export { ChildRoutes };