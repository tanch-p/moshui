<script setup>
import { ref } from "vue";
import Card from "@/components/jokes/Card.vue"

const currentBranch = ref(branches[0])
// watchEffect(async () => {
//   // this effect will run immediately and then
//   // re-run whenever currentBranch.value changes
//   const url = `${API_URL}${currentBranch.value}`
//   commits.value = await (await fetch(url)).json()
// })
const globalShow = ref(false);

</script>
<template>
  <main>
    <h1>Jokes</h1>
    <button @click="() => (globalShow = !globalShow)">Show Answers</button>
    <Card :globalShow='globalShow'/>
  </main>
</template>
