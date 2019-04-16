import Vue from 'vue';
import router from './route';
import store from './store';
// import App from './view/App.vue';

new Vue({
    el: '#root',
    router: router,
    store,
    // render: h => h(App)
});
