<template>
  <section class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo"
    >
    <hr>
    <TodoSimpleForm 
      @add-todo="addTodo"
    />
    <div style="color: red">{{ error }}</div>
    <div v-if="!todos.length">
      There is nothing to display
    </div>
    <TodoList
      :todos="todos"
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
import { ref, computed, watch } from 'vue'
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
    const error = ref('')
    const numberOfTodos = ref(0)
    const limit = 5
    const currentPage = ref(1)
    const searchText = ref('')

    const numberOfPages = computed(()=>{
      return Math.ceil(numberOfTodos.value/limit)
    })

    const getTodos = async (page = currentPage.value) => {
      // es6문법인가봄. page 받는데 디폴트 값 currentPage.value인가봐.
      currentPage.value = page
      try{
        const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`)
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
        await axios.post('http://localhost:3000/todos',{
          subject: todo.subject,
          completed: todo.completed,
        })
        getTodos(1);
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
        getTodos(1)
      }catch(err){
        error.value = 'Something went wrong.'
        console.log(err)
      }
    }

    let timeout = null;
    watch(searchText, ()=>{
      clearTimeout(timeout);
      timeout = setTimeout(()=>{
        getTodos(1)
      },500)
    })
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1)
    }

    return {
      todos, toggle, numberOfTodos,
      deleteTodo, toggleTodo, addTodo, getTodos, numberOfPages,
      searchText, error, currentPage, searchTodo
    }
  }
}

</script>

<style scoped>

</style>