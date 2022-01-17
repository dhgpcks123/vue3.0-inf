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
        <div class="form-check flex-grow-1">
          <input
            class="form-check-input"
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          >
          <label
            class="form-check-label"
            :class=" { todo : todo.completed }"
          >
            {{ todo.subject }}
          </label>
        </div>
        <div>
          <button
            class="btn btn-danger btn-sm"
            @click.stop="deleteTodo(index)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  props: {
    todos: {
      type: Array,
      required: true,
    }
  },
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, { emit }) {
    const router = useRouter()
    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked)

    }
    const deleteTodo = (index) => {
      emit('delete-todo', index)
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