import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//  要设置的全局访问的state对象
const state = {
    count: 0
};

const getters = {
    getCount(state) {
        return state.count;
    }
};

//  自定义改变state初始值的方法,只能同步操作
const mutations = {
    countAdd(state, payload) {
        state.count += payload.addNum;
    }
};

//  Action 可以包含任意异步操作
const actions = {
    // countAddAsync(context, addNum) {
    //     console.log(context);
    //     context.commit('countAdd', addNum);
    // }
    countAddAsync({ commit }, data) {
        // console.log(data);
        commit({
            type: 'countAdd',
            addNum: data.addNum
        });
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;
