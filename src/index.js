import Vue from 'vue';
import router from './route';
import App from './view/App.vue';

// console.log(router);

new Vue({
    el: '#root',
    router: router,
    render: h => h(App)
});
