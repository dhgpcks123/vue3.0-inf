<template>
<!-- v-on -> @, v-bind -> :, v-slot -> # -->
  <Modal>
    <template #title> Delete Todo@ </template>
    <template #body> Are you sure you want delete todo?</template>
    <template v-slot:footer>
      <button
        class="btn btn-secondary"
        type="button"
        @click="onClose"
      >Close
      </button>
      <button
        class="btn btn-danger"
        type="button"
        @click="onDelete"
      >Delete
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
  components: {
    Modal,
  },
  setup(props, { emit }) {
    const onClose = () => {
      emit('close')
    }
    const onDelete = () => {
      emit('delete')
    }
    return {
      onClose, onDelete
    }
  }
}
</script>

<style>

</style>