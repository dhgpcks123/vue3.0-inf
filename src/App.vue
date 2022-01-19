<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link class="navbar-brand" :to="{name:'Home'}">Hyechan Todo</router-link>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="{name:'Todos'}">Todos</router-link>
        </li>
      </ul>
  </div>
  </nav>
  <div class="container">
    <router-view/>
  </div>
  <Toast 
    v-show="showToast"
    :message="toastMessage"
    :type="toastAlertType"
  />
</template>

<script>
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/toast.js'

export default{
  components: {
    Toast,
  },
  setup () {
    const { toastMessage,
            showToast, 
            toastAlertType, 
            triggerToast } = useToast()

    console.log(showToast.value)
    
    return {
      toastMessage,
      showToast, 
      toastAlertType, 
      triggerToast
    }

  }
}
</script>

<style scoped>
</style>