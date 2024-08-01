<template>
  <div class="p-1">
    <form @submit.prevent="check">
      <label class="mb-2">
          <span>آدرس سایت مقصد</span>
          <input type="text" class="form mt-1 dir-l f-left"
                 v-model="url"
                 placeholder="مثال: https://fibdesign.ir">
      </label>
      <button class="btn-custom-block">check</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {ref} from "vue";
const url = ref('https://fibdesign.ir')
const check = () => {
  axios.get( url.value, {
    responseType: 'document'
  })
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
}
</script>

<style scoped lang="scss">

</style>