<template>
  <section class="container">
    <h4>count : {{count}} </h4>
    <h4>doubleCountComputed : {{doubleCountComputed}}</h4>
    <h4>doubleCountComputed : {{doubleCountComputed}}</h4>
    <h4>doubleCountMethod : {{doubleCountMethod()}}</h4>
    <h4>doubleCountMethod : {{doubleCountMethod()}}</h4>
    <button @click="count++">Add One</button>
    <h2>To-Do List</h2>
    <TodoSimpleForm 
      @add-todo="addTodo"
    />
    <div v-if="!todos.length">
      추가 된 todo가 없습니다
    </div>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo"
    />
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import TodoSimpleForm from './components/TodoSimpleForm.vue'
import TodoList from './components/TodoList.vue'

export default{
  components :{
    TodoSimpleForm, TodoList,
  },
  setup() {
    const toggle = ref(false)
    const todos = ref([])

    const addTodo = (todo) => {
      todos.value.push(todo);
    }
    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed
    }
    const deleteTodo = (index) => {
      todos.value.splice(index, 1)
    }

    const count = ref(1)
    const doubleCountComputed = computed (()=>{
      console.log('computed')
      return count.value * 2
      //계산 된 값 캐싱. method보다 효율 좋음.
    })
    //함수랑 뭐가 다를까요>
    const doubleCountMethod = () => {
      console.log('method')
      return count.value * 2
      //method는 인자 받아서 쓸 수 있음. computed는 사용할 수 없음.
    }

    return {
      todos, toggle,
      deleteTodo, toggleTodo, addTodo,
      count, doubleCountComputed, doubleCountMethod,
    }
  }
}

</script>

<style scoped>

</style>