import Vue from 'vue';
import Router from 'vue-router';
import Login from '../view/Login/Login.vue';

Vue.use(Router);

const NotFound = { template: '<p>找不到页面！</p>' };
const routes = [
    {
        path: '/',
        redirect: to => {
            return '/login';
        }
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
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
