<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { store } from "@/components/store.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Authorization: store.token,
  },
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/jokes/${route.params.id}`);
    console.log(response.data.data);
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <main>
    <h1>jokeshow</h1>

    <div id="joke-show-container" class="flex flex-wrap flex-col">
      <div id="joke-show-header-container" class="flex flex-wrap items-center">
        <div>Pic</div>
        <div class="grid grid-rows-2">
          <div>Username</div>
          <div>Posted:</div>
        </div>
        <div id="joke-show-controls" class="flex flex-wrap">
          <div>Upvotes</div>
          <div>Favorite</div>
        </div>
      </div>
      <div id="joke-show-main">Joke</div>
    </div>
  </main>
</template>
