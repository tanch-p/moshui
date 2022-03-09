<script setup>
import { ref, onMounted, computed } from "vue";
import { shuffle as _shuffle } from "lodash-es";
import axios from "axios";
import JokeCard from "@/components/jokes/JokeCard.vue";

const jokes = ref([{ _id: "", setup: "", punchline: "" }]);
const dataReady = ref(false);
const globalShow = ref(false);

const jokesToShow = computed(()=>{ 
  return jokes.value.slice(0,10)
})

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

const shuffle = () => {
  jokes.value = _shuffle(jokes.value);
};
</script>
<template>
  <div>
    <button
      @click="() => (globalShow = !globalShow)"
      :class="[
        'text-xs font-semibold text-center py-1 px-2 border rounded-lg',
        { 'bg-gray-400': globalShow },
      ]"
    >
      Toggle Answers
    </button>
    <button
      @click="shuffle"
      class="text-xs font-semibold text-center py-1 px-2 border rounded-lg"
    >
      shuffle
    </button>
  </div>
  <main class="">
    <div class="md:masonry-md">
      <JokeCard
        v-if="dataReady"
        v-for="(joke, index) in jokesToShow"
        :joke="joke"
        :key="joke._id"
        :globalShow="globalShow"
        :controls="true"
      />
      <div v-else></div>
    </div>
  </main>
</template>

//container flex flex-wrap md:flex-col justify-evenly md:max-h-[135vh] w-[95vw]