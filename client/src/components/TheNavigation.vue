<script setup>
import { ref,nextTick} from "vue";

let language = "cn";
const header = ref(language !== "cn");
const text = ref(`${language}`);

nextTick(() => {
  // access updated DOM
  const collection = ref(document.getElementsByClassName("router-link-active"));
  console.log(collection);
});
</script>

<template>
  <div class="bg-black text-white text-center">
    <p class="text-4xl" v-if="header">Moshui</p>
    <p v-else>墨水</p>
    <p class="">{{ text }}</p>
  </div>
  <div id="navbar" class="h-10 bg-gray-400">
    <router-link to="/">Home</router-link>
    <router-link to="/about"> About</router-link>
    <router-link to="/jokes"> Jokes</router-link>

    <div class="float-right mr-5">Login</div>
  </div>
</template>
