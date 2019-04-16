import { LOGIN } from '../../mutation-types';

const Login = {
    state: {
        loginStatus: false
    },
    getters: {
        getLoginStatus(state) {
            return state.loginStatus;
        }
    },
    actions: {
        [LOGIN]({ commit }, data) {
            commit({
                type: LOGIN,
                // addNum: data.addNum
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
