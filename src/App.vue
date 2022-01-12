<template>
  <!-- <div v-bind:class="nameClass"> v-bind: -> : 로 사용 가능하다.-->
  <div :class="nameClass">
    {{ name }}
  </div>
  <input v-bind:type="type" v-bind:value="name" v-bind:placeholder="test">
  <button
    class="btn btn-primary"
    @click="updateName"
  >
  <!-- v-on:click="updateName"  v-on:click -> @click -->
    Click
  </button>
</template>

<script>
import { ref } from 'vue'

export default{
  setup() {
    const name = ref('hyechan')
    const test = ref('chat here')
    const type = ref('text')
    const nameClass = ref('')

    const updateName = () => {
      name.value = '5'
      test.value = '숫자를 입력해주세요'
      type.value = 'number'
      nameClass.value = 'name'
    }
    return {
      name, updateName, test, type, nameClass
    }
  }
}

</script>

<style scoped>
.name{
  color: red
}
</style>