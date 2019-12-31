import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: {
            escado: false,
            color: 'primary'
        }
    },
    mutations: {
        showLoading(state, payload) {
            state.loading.estado = true
            state.color = payload.color
        },
        hideLoading() {
            state.loading.estado = false
        }

    },
    actions: {

    },
    modules: {}
})