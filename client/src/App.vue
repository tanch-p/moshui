<script setup>
import TheNavigation from "@/components/TheNavigation.vue";
import { ref } from "vue";
const App = ref(null);
</script>

<template>
  <TheNavigation></TheNavigation>
  <div class="">
    <router-view ref="App"></router-view>
  </div>
  <div id="background" class="bg-contain"></div>
</template>

<style scoped>
#background {
  position: fixed;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background-image: url("./assets/ink.jpg");
  background-repeat: no-repeat;
  background-position: bottom right;
  opacity: 75%;
  transition: background-image 1s cubic-bezier(0.165, 0.84, 0.44, 1),
    filter 0.225s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: -1;
}
</style>