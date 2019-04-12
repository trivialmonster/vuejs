import Vue from 'vue';
import router from './route';
import store from './vuex';
import App from './view/App.vue';

// console.log(router);

new Vue({
    el: '#root',
    router: router,
    store,
    render: h => h(App)
});
