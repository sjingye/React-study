import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { IndexRoute } from 'react-router';
import RouteHOC from 'components/authHOC.js';
import asyncComponent from 'components/asyncComponent.js';

const JobList = asyncComponent(() => import('views/JobList/index.jsx'));

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
    {
      path: '/job-list',
      title: '职位列表',
      component: JobList,
      requiresAuth: false,
    },
    {
      path: '/test-provider',
      title: '测试provider',
      component: asyncComponent(() => import('views/Test/TestProvider.jsx')),
      requiresAuth: false,
    },
    {
      path: '/test-proto',
      title: '测试proto',
      component: asyncComponent(() => import('views/Test/TestProto.jsx')),
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
            <Redirect to="/job-list" />
        </Switch>
    )
}

export default AppRouter;
export { ChildRoutes };