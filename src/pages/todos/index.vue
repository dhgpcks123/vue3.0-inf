<template>
  <section>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button
        class="btn btn-primary"
        @click="moveToCreatePage"
      >
        Create
      </button>
    </div>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo"
    >
    <hr>
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
  <Toast 
    v-if="showToast"
    :message="toastMessage"
    :type="toastAlertType"
  />
</template>

<script>
import { ref, computed, watch } from 'vue'
import TodoList from '@/components/TodoList.vue'
import Pagination from '@/components/Pagination.vue'
import axios from 'axios'
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/toast'
import { useRouter } from 'vue-router'

export default{
  components :{ 
    TodoList, 
    Pagination, 
    Toast
  },
  setup() {
    const router = useRouter()
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

    const { toastMessage,
            showToast, 
            toastAlertType, 
            triggerToast } = useToast()


    const getTodos = async (page = currentPage.value) => {
      // es6문법인가봄. page 받는데 디폴트 값 currentPage.value인가봐.
      currentPage.value = page
      try{
        const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`)
        numberOfTodos.value = res.headers['x-total-count']
        todos.value = res.data
      }catch(err){
        triggerToast('Something went wrong','danger')
        console.log(err)
      }
    }

    getTodos();

    const addTodo = async (todo) => {
      // db 저장
      try{
        await axios.post('http://localhost:3000/todos',{
          subject: todo.subject,
          completed: todo.completed,
        })
        getTodos(1);
      }catch(err){
        triggerToast('Something went wrong','danger')
        console.log(err)
      } 
    }
    const toggleTodo = (index, checked) => {
      console.log(checked)
      const id = todos.value[index].id
      try{
        axios.patch(`http://localhost:3000/todos/${id}`, {
          completed: checked
        })
        todos.value[index].completed = checked
      }catch(err){
        triggerToast('Something went wrong','danger')
        console.log(err)
      }
    }
    const deleteTodo = async (id) => {

      try{
        await axios.delete(`http://localhost:3000/todos/${id}`)
        getTodos(1)
      }catch(err){
        triggerToast('Something went wrong','danger')
        console.log(err)
      }
    }
    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate'
      })
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
      searchText, error, currentPage, searchTodo,
      showToast, toastMessage, toastAlertType, triggerToast, moveToCreatePage
    }
  }
}

</script>

<style scoped>

</style>