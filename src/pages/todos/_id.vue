<template>
  <h1>Todo 페이지</h1>
  <todoForm :editing="true" />
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'

export default{
  components: {
    TodoForm
  }
}
</script>

<style>

</style>