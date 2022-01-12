<template>
  <section class="container">
    <h2>To-Do List</h2>
    <form  
      @submit.prevent="onSubmit"
      class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type new todo"
        >
      </div>
      <div>
        <button
          class="btn btn-primary"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="card mt-2"
    >
      <div class="card-body p-2">
        {{ todo.subject }}
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default{
  setup() {
    const todo = ref('')
    const todos = ref([
      {id: 1, subject: '행복해지기'},
      {id: 2, subject: '덜 열심히 살기'},
    ])

    const onSubmit = () => {
      todos.value.push({
        id: Date.now(),
        subject: todo.value
      })
      todo.value = ''
    }
    return {
      todo, todos,
      onSubmit,
    }
  }
}

</script>

<style scoped>
.name{
  color: red
}
</style>