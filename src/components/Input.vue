<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      class="form-control"
      :value="subject"
      @input="onInput"
      type="text"
    >
    <div
      class="text-red"
      v-if="error"
    >
      {{error}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label:{
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    }
  },
  setup(props, { emit }) {
    const onInput = (e) => {
      emit('update:subject', e.target.value)
    }

    return {
      onInput,
    }
  }
}
</script>

<style scoped>
.text-red{
  color: red;
}
</style>