<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import JokeCard from "@/components/jokes/JokeCard.vue";


const jokes = ref([{ _id: "", setup: "", punchline: "" }]);
const dataReady = ref(false);

onMounted(async () => {
  try {
    const response = await axios.get("/api/jokes/");
    console.log(response.data.data);
    jokes.value = response.data.data;
    dataReady.value = true;
  } catch (err) {
    console.log(err);
  }
});

const globalShow = ref(false);
</script>
<template>
  <div>
    <h1>Jokes</h1>
    <button @click="() => (globalShow = !globalShow)">Show Answers</button>
  </div>
  <main>
    <div class="masonry sm:masonry-sm md:masonry-md">
      <JokeCard
        v-if="dataReady"
        v-for="(joke, index) in jokes"
        :joke="joke"
        :key="joke._id"
        :globalShow="globalShow"
      />
      <div v-else></div>
    </div>
  </main>
</template>

