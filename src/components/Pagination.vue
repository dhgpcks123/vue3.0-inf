<template>
  <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a
            @click="getTodos(currentPage-1)"
            class="page-link"
          >
            Previous
          </a>
        </li>
        <li
          v-for="page in numberOfPages" :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
        >
          <a @click="getTodos(page)" class="page-link">{{page}}</a>
        </li>
        <li v-if="numberOfPages!=0 && numberOfPages !== currentPage" class="page-item">
          <a
            @click="getTodos(currentPage+1)"
            class="page-link"
          >
          next
          </a>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    numberOfPages: {
      type: Number,
      required: true,
    }
  },
  setup(context, { emit }){
    const getTodos = (page)=>{
      emit('get-todos', page)
    }
    return {
      getTodos
      }
  }

}
</script>

<style>

</style>