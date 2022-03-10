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

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Authorization: store.token,
  },
};

onMounted(async () => {
  if (store.token === "") {
    router.replace("/");
  }
  try {
    const response = await axios.get(
      `/api/users/${route.params.id}/favorites/`,
      axiosConfig
    );
    console.log(response.data.data);
    jokes.value = response.data.data.favorites;
    dataReady.value = true;
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <main class="">
    <p class="text-center">{{store.user}}'s Favorites:</p>
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
