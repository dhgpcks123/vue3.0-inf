import { ref, onUnmounted } from 'vue'

export const useToast = () => {
  const showToast = ref(false)
  const toastMessage = ref('')
  const toastAlertType = ref('')
  const timeout = ref(null)
  const triggerToast = (message, type = 'success') => {
    toastMessage.value = `${message}`
    toastAlertType.value = type
    showToast.value = true
    timeout.value = setTimeout(()=>{
      showToast.value = false
      toastAlertType.value = ''
      toastMessage.value = ''
    },  3000)
  }            
  //settimeout, 실행 완료되기 전 페이지를 벗어난다면? 실행할 필요가 없게 됨.
  onUnmounted(()=>{
    clearTimeout(timeout.value)
  })

  return {
    toastMessage, showToast, toastAlertType, triggerToast
  }
}