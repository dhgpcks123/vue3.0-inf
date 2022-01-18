<template>
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
            class="form-control"
            v-model="todo.subject"
            type="text"
          >
          <div
            class="text-red"
            v-if="subjectError"
          >
            {{subjectError}}
          </div>
        </div>
      </div>
      <div v-if="editing" class="col-6">
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
      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea v-model="todo.body" class="form-control" cols="30" rows="10">
          </textarea>
        </div>
      </div>
    </div>
    <button
      class="btn btn-primary"
      type="submit"
      :disabled="todoUpdated"
    >
      {{ editing ? 'Update' : 'Create'}}
    </button>
    <button
      class="btn btn-outline-dark ml-2"
      type="button"
      @click="moveTodoListPage"
    >
      취소
    </button>
  </form>
  <transition name="fade">
    <Toast 
      v-show="showToast"
      :message="toastMessage"
      :type="toastAlertType"
    />
  </transition>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ref, computed } from 'vue'
import _ from 'lodash'
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/toast'

//Router와 Route차이
export default {
  components: {
    Toast,
  },
  props:{
    editing:{
      type: Boolean,
      default: false, 
    } 
  },
  setup(props){
    //mount 되기 전에  setup한번 훑고 mount 실행
    const route = useRoute()
    const router = useRouter()
    const todo = ref({
      subject: '',
      completed: false,
      body: '',
    })
    const subjectError = ref('')
    const originalTodo = ref(null)
    const loading = ref(false)
    const todoId = route.params.id

    const { toastMessage,
            showToast, 
            toastAlertType, 
            triggerToast } = useToast()

    const getTodo = async () => {
      loading.value = true
      try{
        const res = await axios.get(`http://localhost:3000/todos/${todoId}`)
        //getContext ='' 해서 사용했는데 localhost -> 도메인 주소로 바로 변경할 수 있도록 공통화하면 좋겠네.
        todo.value = {...res.data}
        originalTodo.value = {...res.data}
        //같은 데이터를 담으면 같은 주소 값을 본다.
        loading.value = false
      }catch(err){
        loading.value = false
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

    const onSave = async () => {
      subjectError.value = ''
      if(!todo.value.subject){
        subjectError.value = 'Subject is required'
        return
      }
      try{
        let res;
        const data = {
            subject: todo.value.subject,
            completed: todo.value.completed,
            body: todo.value.body,
        }
        let message = ''
        if(props.editing){
          res = await axios.put(`http://localhost:3000/todos/${todoId}`, data)
          originalTodo.value = {...res.data}
          message = 'successfully editing!'
        }else{
          res = await axios.post(`http://localhost:3000/todos/`, data)
          message = '저장 성공!'
          todo.value.subject = ''
          todo.value.body = ''
        }
        triggerToast(message)
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

    if(props.editing){
      getTodo()
    }
    
    return{
      todo, loading, showToast, toastMessage, toastAlertType, subjectError,
      toggleTodoStatus, moveTodoListPage, onSave, todoUpdated
    }
  }
}
</script>

<style scoped>
  .text-red{
    color: red;
  }
  .fade-enter-active, .fade-leave-active{
    transition: all 1s ease;
  }
  .fade-enter-from, .fade-leave-to{
    opacity: 0;
    transform: translateY(-30px);
  }

  .fade-enter-to, .fade-leve-from{
    opacity: 1;
    transform: translateY(0px);
  }
</style>
<style>
/* 글로벌하게 사용하도록 하나 더 추가 가능하다. */
</style>