<template>
  <h1>Todo 페이지</h1>
  <div v-if="loading">
    loading...
  </div>
  <form
    v-else
    @submit.prevent="onSave"
  >
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Subject</label>
          <input
            v-model="todo.subject"
            type="text"
            class="form-control"
          >
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              class="btn"
              type="button"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{todo.completed ? 'Completed' : 'Incompleted'}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      class="btn btn-primary"
      type="submit"
      :disabled="todoUpdated"
    >
      저장
    </button>
    <button
      class="btn btn-outline-dark ml-2"
      type="button"
      @click="moveTodoListPage"
    >
      취소
    </button>
  </form>
  <Toast 
    v-if="showToast"
    :message="toastMessage"
    :type="toastAlertType"
  />
  <div id="mountTest"></div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ref, computed, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import _ from 'lodash'
import Toast from '@/components/Toast.vue'

//Router와 Route차이
export default {
  components: {
    Toast,
  },
  setup(){
    onBeforeMount(()=> {
      //dom에 마운트 되기 전에
      console.log(document.querySelector('#mountTest'))
    })
    onMounted(()=>{
      //dom에 마운트 되었을 때
      console.log(document.querySelector('#mountTest'))
    })
    onBeforeUpdate(()=>{
      console.log('beforeUpdate')
    })
    onUpdated(()=>{
      console.log('updated')
    })
    onBeforeUnmount(()=>{
      console.log('onBeforeUnmount')
    })
    onUnmounted(()=>{
      console.log('Unmounted')
      //쓸 때 없는 게 메모리 먹고 있지 않도록 하기 위해서 onUnmounted사용한다.
    })
    console.log('hello')
    //mount 되기 전에  setup한번 훑고 mount 실행
    const route = useRoute()
    const router = useRouter()
    const todo = ref(null)
    const originalTodo = ref(null)
    const loading = ref(true)
    const showToast = ref(false)
    const toastMessage = ref('')
    const toastAlertType = ref('')
    const todoId = route.params.id

    const getTodo = async () => {
      try{
      const res = await axios.get(`http://localhost:3000/todos/${todoId}`)

      todo.value = {...res.data}
      originalTodo.value = {...res.data}
      //같은 데이터를 담으면 같은 주소 값을 본다.
      loading.value = false
      }catch(err){
        triggerToast('불러오기를 실패했습니다', 'danger')
      }
    }
    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed
    }
    const moveTodoListPage = () => {
      router.push({
        name: 'Todos'
      })
    }
    const triggerToast = (message, type = 'success') => {
      toastMessage.value = `${message}`
      toastAlertType.value = type
      showToast.value = true
      setTimeout(()=>{
        showToast.value = false
        toastAlertType.value = ''
        toastMessage.value = ''
      },  3000)
    }
    const onSave = async () => {
      try{
        const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
        subject: todo.value.subject,
        completed: todo.value.completed
        })
        originalTodo.value = {...res.data}
        triggerToast('successfully saved!')
      }catch(err){
        triggerToast('Something went wrong','danger')
      }
    }
    const todoUpdated = computed(()=>{
      return _.isEqual(todo.value, originalTodo.value)
      // stringify로 같은지 비교하는데- 순서 바뀌면 stringify 비교가 어려워지는 단점이있음.
      // lodash 객체 같은지 비교 해주는 라이브러리 사용
      // _ 많이 사용함.
    })
    getTodo()
    return{
      todo, loading, showToast, toastMessage, toastAlertType,
      toggleTodoStatus, moveTodoListPage, onSave, todoUpdated
    }
  }
}
</script>

<style>

</style>