const userModulde = {
    state: {
        isLogin: false,
        dataUser: {
            name: ''
        }
    },
    mutations: {
        setIsLogin(state, payload) {
            state.isLogin = payload;
        },
        setDataUser(state, payload) {
            state.dataUser = payload;
        }
    },
    actions: {
        setIsLoginAction({ commit, dispatch }) {
            const bool = localStorage.getItem('token') && localStorage.getItem('user_name');
            if (bool) dispatch('setDataUserAction');
            commit('setIsLogin', bool);
        },
        setDataUserAction({ commit, state }) {
            const aux = {
                name: localStorage.getItem('user_name') || ''
            }

            commit('setDataUser', aux);
        }
    }
}

export default userModulde;