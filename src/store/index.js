import { createStore } from "vuex";
import userModulde from "./modules/user-moudel";

const store = createStore({
    state: {
        categoriesTree: [],
        moveContainerApp: false,
    },
    mutations: {
        setCategoriesTree(state, payload) {
            state.categoriesTree = payload;
        },
        setMoveContinerApp(state, payload) {
            state.moveContainerApp = payload;
        },
    },
    actions: {
        moveContainerAppAction({ commit }, bool = false) {
            commit('setMoveContinerApp', bool);
        },

    },
    modules: {
        userModule: userModulde
    }
});

export default store;