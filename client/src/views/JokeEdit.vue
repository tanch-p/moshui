<script setup>
import Joke from "../components/uploadJoke.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import { store } from "../components/store.js";
import {useRoute} from "vue-router"

const route= useRoute();
const currentTab = ref("Joke");
const joke = ref({});
const dataReady = ref(false);
onMounted(async () => {
  try {
    const response = await axios.get(`/api/jokes/${route.params.id}`);
    // console.log(response.data.data);
    joke.value = response.data.data;
    dataReady.value = true;
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div class="flex flex-none items-center h-[90vh]">
    <div
      class="
        flex flex-none flex-col
        m-auto
        w-[100vw]
        md:w-[60vw]
        relative
        h-[70%]
      "
    >
      <div v-if="dataReady" class="w-full">
        <Joke :edit="true" :prevSetup="joke.setup" :prevPunchline="joke.punchline" />
      </div>
    </div>
  </div>
</template>

<style>
.active {
  background: #e0e0e0;
}
</style>