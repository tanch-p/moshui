<script setup>
import { ref, watch, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

let language = "cn";
const header = ref(language !== "cn");
const text = ref(`${language}`);

const route = useRoute();
watchEffect(() => route.path, console.log(route.path));

const destinationId = computed(() => {
  console.log(this.$route.path);
  return parseInt(this.$route.params.id);
});
</script>

<template>
  <div class="bg-black text-white text-center">
    <p class="text-4xl" v-if="header">Moshui</p>
    <p v-else>墨水</p>
    <p class="">{{ text }}</p>
  </div>
  <div id="navbar" class="h-10 bg-gray-400 flex flex-row">
    <router-link to="/">Home</router-link>
    <router-link to="/about"> About</router-link>
    <router-link to="/jokes"> Jokes</router-link>
    <router-link to="/new"> New</router-link>

    <router-link to="/login"> Login</router-link>
    <p>{{ $route.path }}</p>
  </div>
</template>
