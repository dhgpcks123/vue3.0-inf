<template>
  todo page
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup(){
    const route = useRouter()
    console.log('route타고 넘어온 id : ' + route.params.id)
  }
}
</script>

<style>

</style>