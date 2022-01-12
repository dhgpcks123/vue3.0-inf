<template>
  <div v-if="toggle">true</div>
  <div v-else>false</div>
  <button @click="onToggle">Toggle</button>
  <section class="container">
    <h2>To-Do List</h2>
    <form  
      @submit.prevent="onSubmit"
    >
      <div class="d-flex">
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
      </div>
      <div v-show="hasError" style="color: red">
        This field cannot be empty
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
    const toggle = ref(false)
    const todo = ref('')
    const todos = ref([
      {id: 1, subject: '행복해지기'},
      {id: 2, subject: '덜 열심히 살기'},
    ])
    const hasError = ref(false)

    const onSubmit = () => {
      if(todo.value === ''){
        hasError.value = true
      }else{
        todos.value.push({
          id: Date.now(),
          subject: todo.value
        })
        todo.value = ''
        hasError.value = false
      }
    }
    const onToggle = () => {
      toggle.value = !toggle.value
    }
    return {
      todo, todos, toggle, hasError,
      onSubmit, onToggle
    }
  }
}

</script>

<style scoped>
.name{
  color: red
}
</style>