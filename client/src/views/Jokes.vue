<script setup>
import { ref } from "vue";
import Card from "@/components/jokes/Card.vue";

// const currentBranch = ref(branches[0]);
// watchEffect(async () => {
//   // this effect will run immediately and then
//   // re-run whenever currentBranch.value changes
//   const url = `${API_URL}${currentBranch.value}`
//   commits.value = await (await fetch(url)).json()
// })
let id = 0
const jokes = ref([{ id: id++, text: "Learn HTML" }]);

const globalShow = ref(false);
</script>
<template>
  <div>
    <h1>Jokes</h1>
    <div><router-link to="/jokes/new"> New Joke</router-link></div>
    <button @click="() => (globalShow = !globalShow)">Show Answers</button>
  </div>
  <main>
    <div class="masonry sm:masonry-sm md:masonry-md">
      <div className="rounded-lg bg-gray-500 p-4 break-inside">
        <Card :globalShow="globalShow" />
      </div>
      <div className="rounded-lg bg-gray-500 p-4 break-inside">
        <p>lorem150</p>
      </div>
      <div className="rounded-lg bg-gray-500 p-4 break-inside">
        <p>lorem50</p>
      </div>
      <div className="rounded-lg bg-gray-500 p-4 break- inside">
        <p>lorem200</p>
      </div>
    </div>
  </main>
</template>
