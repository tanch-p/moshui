<script setup>
import Joke from "../components/uploadJoke.vue";
import Meme from "../components/uploadMeme.vue";
import { ref } from "vue";

import { store } from "../components/store.js";

const currentTab = ref("Joke");

const tabs = {
  Joke,
};
console.log(store);
</script>

<template>
  <div v-if="store.user === ''">
    Please <router-link to="/login" class="text-blue-600">login</router-link> to
    be able to make a post
  </div>
  <div v-else class="flex flex-none items-center h-[90vh]">
    <div class="flex flex-none flex-col m-auto w-[100vw] md:w-[60vw] relative h-[70%]">
      <div class="w-full">
        <button
          v-for="(_, tab) in tabs"
          :key="tab"
          :class="[
            'border rounded-sm bg-[#f0f0f0] hover:bg-[#e0e0e0] p-1 w-min',
            { active: currentTab === tab },
          ]"
          @click="currentTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <component :is="tabs[currentTab]" ></component>
    </div>
  </div>
</template>

<style>
.active {
  background: #e0e0e0;
}
</style>