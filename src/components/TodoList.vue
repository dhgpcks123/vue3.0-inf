<template>
  <div
      v-for="(todo, index) in todos"
      :key="todo.id"
      class="card mt-2"
    >
      <div
        class="card-body d-flex p-2 align-items-center"
        @click="moveToPage(todo.id)"
        style="cursor: pointer"
      >
        <div class="flex-grow-1">
          <input
            class="ml-2 mr-2"
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          >
          <span
            :class=" { todo : todo.completed }"
          >
            {{ todo.subject }}
          </span>
        </div>
        <div>
          <button
            class="btn btn-danger btn-sm"
            @click.stop="openModal(todo.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <teleport to="#modal">
      <Modal
        v-if="showModal"
        @close="closeModal"
        @delete="deleteTodo"
      >
      </Modal>
      <!-- 최상위에 위치해야하는 모달이나 toast 같은 걸 teleport하면 좋다 navbar? bottom-navbar? -->
    </teleport>
</template>

<script>
import { useRouter } from 'vue-router'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'

export default {
  components: {
    Modal,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    }
  },
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, { emit }) {
    const router = useRouter()
    const showModal = ref(false)
    const todoDeleteId = ref(null)
    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked)

    }

    const openModal = (id) => {
      todoDeleteId.value = id
      showModal.value = true
    }

    const closeModal = () => {
      todoDeleteId.value = null
      showModal.value = false
    }

    const deleteTodo = () => {
      emit('delete-todo', todoDeleteId.value)
      showModal.value = false
      todoDeleteId.value = null
    }
    const moveToPage = (todoId) => {
      console.log(todoId)
      // router.push(`/todos/${todoId}`)
      router.push({
        name: 'Todo',
        params: {
          id: todoId
        }
      })
      //코드는 위에꺼가 짧고 간략하지만.. 아래꺼는 이름으로 바꾸니까 path, 경로 바꾸더라도 바꿀 수 있음. 그리고 파라미터 뭐 념기는지 명확하기도 하고.
    }
    return{
      toggleTodo, deleteTodo, moveToPage,
      showModal, openModal, closeModal, todoDeleteId,
    }
  }
}
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>