<script setup>
import { ref } from 'vue'
const props = defineProps({
  globalShow: Boolean
})

const localShow = ref(false)

</script>

<template>
  <div class="flex flex-wrap flex-col lg:w-[200px]">
    <div>test</div>
    <h1 v-if="globalShow || localShow">Vue is awesome!</h1>
    <button v-else @click="localShow=!localShow">>Reveal Answer</button>
  </div>
</template>