export default {
  namespaced: true,
  state: {
    toasts: [],
  },
  mutations: {
    ADD_TOAST (state, payload) {
      state.toasts.push(payload)
    },
    REMOVE_TOAST (state) {
      state.toasts.shift()
    }
  },
  actions: {
    triggerToast({ commit }, payload) {
      //message, type = 'success'
      commit('ADD_TOAST', {
        id: Date.now(),
        message: payload.message,
        type: payload.type,
      })
      setTimeout(() => {
        commit('REMOVE_TOAST')
      },  10000)
    }
  },
  getters: {
  //getters는 computed처럼 사용된다.
    toastMessageWithSmile ( state ) {
      return state.toastMessage + ' ^-^*'
      //state.toastMessage watch하고 있다가 toastMessageWithSmile실행된다.
    }
  },

}