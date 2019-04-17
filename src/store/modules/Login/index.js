import axios from 'axios';
import { LOGIN } from '../../mutation-types';

const Login = {
    namespaced: true,
    state: {
        isLoading: false,
        loginStatus: false
    },
    getters: {
        getLoginStatus(state) {
            return state.loginStatus;
        }
    },
    actions: {
        [LOGIN]({ commit }, data) {
            axios.get('/test')
                .then(function (response) {
                    console.log(response);
                    commit({
                        type: LOGIN,
                        // addNum: data.addNum
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mutations: {
        [LOGIN](state, payload) {
            state.loginStatus = true;
        }
    }
};

export default Login;
