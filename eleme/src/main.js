// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

//引入需要打包的外部样式
import 'common/scss/index.scss'

//全局注册
Vue.use(vueRouter)
Vue.use(vueResource)

const routes = [{
        path: './goods',
        component: goods
    },
    {
        path: './ratings',
        component: ratings
    },
    {
        path: './seller',
        component: seller
    }
]

const router = new vueRouter({
    mode: 'abstract', //支持所有 JavaScript 运行环境
    base: _dirname,
    routes
})


/* eslint-disable no-new */
const app = new Vue({
    //相当于vue1.X下的这样
    // el: '#app',
    // components: { App },
    router,
    // template: '<App/>',
    // h函数仅是作为createElement函数之缩写，相当于
    // function (h) {  
    //   return h(App);  
    // },可以直接给绑定节点渲染一个vue组件
    render: h => h(App)
}).$mount('#app')

//和
// const app=new Vue({
//     el:'#app',
//     router,
//     compoments:{
//         App
//     },
//     template:"<App/>"
// });
//一个意思

// 打开的默认路径
router.push('/goods')