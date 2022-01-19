import { computed } from 'vue'
import { useStore } from 'vuex'

export const useToast = () => {
  const store = useStore()
  const toastMessage = computed(()=>store.state.toastMessage)
  const toastAlertType = computed(()=>store.state.toastAlertType)
  const showToast = computed(()=>store.state.showToast)
  const triggerToast = (message, type = 'success') => {
    //mutations - commit
    //actions - dispatch
    store.dispatch('triggerToast', message, type)
  }            
  //settimeout, 실행 완료되기 전 페이지를 벗어난다면? 실행할 필요가 없게 됨.
  // onUnmounted(()=>{
  //   clearTimeout(timeout.value)
  // }) --> App.vue에서 사용하니까 필요 없습니다.

  return {
    toastMessage, showToast, toastAlertType, triggerToast
  }
}