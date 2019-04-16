import Vue from 'vue';
import Router from 'vue-router';
import * as ROUTES from '../constant/routes';

//  路由懒加载
const Login = () => import('../views/Login/Login.vue');
const Homepage = () => import('../views/Homepage/Homepage.vue');

Vue.use(Router);

const NotFound = { template: '<p>找不到页面！</p>' };
const routes = [
    {
        path: ROUTES.BASE_ROUTE_PATH,
        redirect: to => {
            return ROUTES.LOGIN;
        }
    },
    {
        path: ROUTES.LOGIN,
        component: Login,
    },
    {
        path: ROUTES.HOMEPAGE,
        component: Homepage,
    },
    {
        path: '*',
        component: NotFound,
        name: '404'
    }
];

const router = new Router({
    // mode: 'history',
    routes
});

//  导航守卫-全局前置守卫
router.beforeEach((to, from, next) => {
    // console.log(to);
    next();
});

export default router;
