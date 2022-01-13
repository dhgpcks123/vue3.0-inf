<template>
  <section class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="search"
    >
    <hr>
    <TodoSimpleForm 
      @add-todo="addTodo"
    />
    <div style="color: red">{{ error }}</div>
    <div v-if="!filteredTodos.length">
      There is nothing to display
    </div>
    <TodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo"
    />
    <hr>
    <Pagination
      :currentPage="currentPage"
      :numberOfPages="numberOfPages"
      @get-todos="getTodos"
    />
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import TodoSimpleForm from './components/TodoSimpleForm.vue'
import TodoList from './components/TodoList.vue'
import Pagination from './components/Pagination.vue'
import axios from 'axios'

export default{
  components :{
    TodoSimpleForm, TodoList, Pagination,
  },
  setup() {
    const toggle = ref(false)
    const todos = ref([])
    const searchText = ref('')
    const error = ref('')
    const numberOfTodos = ref(0)
    const limit = 5
    const currentPage = ref(1)

    const numberOfPages = computed(()=>{
      return Math.ceil(numberOfTodos.value/limit)
    })

    const getTodos = async (page = currentPage.value) => {
      // es6문법인가봄. page 받는데 디폴트 값 currentPage.value인가봐.
      currentPage.value = page
      try{
        const res = await axios.get(`http://localhost:3000/todos?_page=${page}&_limit=${limit}`)
        numberOfTodos.value = res.headers['x-total-count']
        todos.value = res.data
      }catch(err){
        error.value = 'Something went wrong.'
        console.log(err)
      }
    }

    getTodos();

    const addTodo = async (todo) => {
      // db 저장
      error.value = ''
      try{
        const res = await axios.post('http://localhost:3000/todos',{
          subject: todo.subject,
          completed: todo.completed,
        })
        todos.value.push(res.data)
      }catch(err){
        error.value = 'Something went wrong.'
        console.log(err)
      } 
    }
    const toggleTodo = (index) => {
      error.value = ''
      const id = todos.value[index].id
      try{
        axios.patch(`http://localhost:3000/todos/${id}`, {
          completed: !todos.value[index].completed
        })
        todos.value[index].completed = !todos.value[index].completed
      }catch(err){
        error.value = 'Something went wrong.'
        console.log(err)
      }
    }
    const deleteTodo = async (index) => {
      error.value = ''
      const id = todos.value[index].id
      todos.value.splice(index, 1)
      try{
        await axios.delete(`http://localhost:3000/todos/${id}`)
      }catch(err){
        error.value = 'Something went wrong.'
        console.log(err)
      }
    }
    const filteredTodos = computed(()=>{
      if(searchText.value){
        return todos.value.filter((todo)=>{
          return todo.subject.includes(searchText.value)
        })
      }

      return todos.value
    })
    return {
      todos, toggle, numberOfTodos,
      deleteTodo, toggleTodo, addTodo, getTodos, numberOfPages,
      searchText, filteredTodos, error, currentPage
    }
  }
}

</script>

<style scoped>

</style>