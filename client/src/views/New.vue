<script setup>
import Joke from "../components/uploadJoke.vue";
import Meme from "../components/uploadMeme.vue";
import { ref } from "vue";

import { store } from "../components/store.js";

const currentTab = ref("Joke");

const tabs = {
  Joke,
  Meme,
};
console.log(store);
</script>

<template>
  <div v-if="store.user === ''">
    Please <router-link to="/login">login </router-link> to be able to make a
    post
  </div>
  <div v-else>
    <div class="border-2 m-auto w-[100vw] md:w-full">
      <button
        v-for="(_, tab) in tabs"
        :key="tab"
        :class="[
          'border rounded-sm bg-[#f0f0f0] hover:bg-[#e0e0e0] p-1',
          { active: currentTab === tab },
        ]"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
    </div>
    <component :is="tabs[currentTab]" class=""></component>
  </div>
</template>

<style>
.active {
  background: #e0e0e0;
}
</style>