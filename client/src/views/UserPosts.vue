<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { store } from "@/components/store.js";
import { useRouter, useRoute } from "vue-router";
import JokeGrid from "@/components/jokes/JokeGrid.vue";

const router = useRouter();
const route = useRoute();
const dataReady = ref(false);
const jokes = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get(`/api/users/jokes/${route.params.id}`);
    console.log(response.data.data);
    jokes.value = response.data.data[0].jokes;
    dataReady.value = true;
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <main class="">
    <p class="">Posts by {{route.params.id}}</p>
    <div class="grid grid-cols-2 md:w-[80vw] mx-auto gap-y-10 gap-x-32">
      <JokeGrid
        v-if="dataReady"
        v-for="(joke, index) in jokes"
        :joke="joke"
        :key="joke._id"
      />
    </div>
  </main>
</template>
