import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RouteHOC from 'components/authHOC.js';
import useDocumentTitle from 'components/useDocumentTitle.js';

import asyncComponent from 'components/asyncComponent.js';

const JobList = asyncComponent(() => import('views/JobList/index.jsx'));
const Login = asyncComponent(() => import('views/Login/index.jsx'));

const ChildRoutes = [
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
    // {
    //     path: '/test-mobx',
    //     title: '测试mobx',
    //     component: asyncComponent(() => import('views/TestMobx/index.jsx')),
    //     requiresAuth: false,
    // },
];

/* 嵌套赋值例子
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj // {prop:123}
arr // [true]

所有路由-树状结构
const ChildRoutesTree = [
  {
    title: '权限管理',
    child: [
      {
        title: '角色管理',
        child: [
          {
            title: '角色管理',
            path: '/auth/role',
            component: Role,
          },
          {
            title: '编辑角色',
            path: '/auth/addRole/:id',
            component: addRole,
          },
        ]
      },
      {
        title: '用户管理',
        child: [
          {
            title: '用户管理',
            path: '/auth/user',
            component: User,
          },
          {
            title: '编辑用户',
            path: '/auth/adduser',
            component: addUser,
          },
        ]
      },
    ]
  },
  {
    title: '战区管理',
    child: [
      {
        title: '战区管理',
        path: '/team/index',
        component: Team,
      },
      {
        title: '编辑战区',
        path: '/team/new/:id',
        component: addTeam,
      },
    ]
  },
  {
    title: '职位管理',
    child: [
      {
        title: '职位管理',
        path: '/jobs/index',
        component: Jobs,
      },
      {
        title: '简历列表',
        path: '/resume-list/:id',
        component: ResumeList,
      },
      {
        title: '查看简历',
        path: '/resume/:type/:id',
        component: Resume,
      },
      {
        title: '编辑职位',
        path: '/jobs/new',
        component: addJob,
      },
    ]
  },
  {
    title: '竞品管理',
    child: [
      竞品管理
      {
        title: '竞品管理',
        path: '/competitor/index',
        component: Competitor,
      },
      {
        title: '编辑竞品',
        path: '/competitor/new/:id',
        component: addCompetitor,
      },
    ]
  },
  {
    title: '院校信息',
    child: [
      {
        title: '院校信息',
        path: '/school/index',
        component: School,
      },
      {
        title: '编辑院校',
        path: '/school/new/:id',
        component: addSchool,
      },
      {
        title: '拜访记录',
        path: '/school/:id/visit/:visitId',
        component: Visit,
      },
      {
        title: '校招活动',
        path: '/activity/index',
        component: Activity,
      },
      {
        title: '编辑活动',
        path: ' /school/application',
        component: Activity,
      },
    ]
  },
  {
    title: '人才库',
    path: '/talents',
    component: Talents,
  },
  {
    title: '我的人才',
    path: '/jobs/applicants',
    component: Talents,
  },
  {
    title: '测评',
    path: '/jobs/evaluate',
    component: Evaluate,
  },
];
*/
/**
 * 方法1
let accuArray = []
export function renderRoutes(routes) {
  const a = routes.reduce((accu, route) => {
    if (Array.isArray(route.child) && route.child.length > 0) {
      return renderRoutes(route.child)
    }
    return accu.concat(route);
  }, accuArray)
  accuArray = [...a];
  return a;
}


 * 方法2
export function renderRoutes(routes) {
  let set = new Set(routes);
  let list = routes.slice(); // 看情况使用深拷贝
  while (list.length > 0) {
    const router = list.shift();
    if (Array.isArray(router.child)) {
      router.child.forEach(item => {
        if (!set.has(item)) {
          set.add(item);
          list.push(item);
        }
      })
    }
  }
  return [...set]
}
export function renderRoutes(routes) {
    return routes.reduce((accu, route) => {
        return accu.concat(Array.isArray(route.child) && route.child.length > 0 ? renderRoutes(route.child) : [route]);
    }, [])
}
  */
// BaseComponent嵌套赋值，参照高阶组件生命周期更改的方法
// function PrivateRoute({ component: BaseComponent, ...rest }) {
//     return (
//         <Route {...rest} render={props => sessionStorage.getItem('username') ?
//             <BaseComponent {...props} /> :
//             <Redirect to={{ pathname: '/login', state: { from: props.location } }} />} />
//     )
// }
// const AppRouter = () => {
//     return (
//         <Switch>
//             {ChildRoutes.map(item => {
//                 return (item.requiresAuth ?
//                     <PrivateRoute exact component={RouteHOC(item.component, item.title)} path={item.path} key={item.path} /> :
//                     <Route exact component={RouteHOC(item.component, item.title)} path={item.path} key={item.path} />)
//             })}
//             <Redirect to="/job-list" />
//         </Switch>
//     )
// }
// 用hooks实现
function PrivateRoute({component: BaseComponent, ...rest}) {
    useDocumentTitle(rest.title);
    return (
        !rest.requiresAuth || (rest.requiresAuth && sessionStorage.getItem('username')) ? <BaseComponent /> 
        : <Redirect to={{ pathname: '/login'}} />
    )
}
const AppRouter = () => {
    return (
        <Switch>
            {ChildRoutes.map(item => {
                return <PrivateRoute exact  key={item.path} {...item} />
            })}
            <Route exact component={Login} path="/login" />
            <Redirect to="/job-list" />
        </Switch>
    )
}
export default AppRouter;
export { ChildRoutes };