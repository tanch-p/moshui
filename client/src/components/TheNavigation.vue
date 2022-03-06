<script setup>
import { ref, watch, computed, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { store } from "../components/store.js";

let language = "cn";
const header = ref(language !== "cn");
const text = ref(`${language}`);

const router = useRouter();
const route = useRoute();
// watchEffect(() => route.path, console.log(route.path));

const logout = () => {
  store.user = "";
  store.token = "";
  router.go(0);
};
</script>

<template>
  <div class="bg-black text-white text-center">
    <p class="text-4xl" v-if="header">Moshui</p>
    <p v-else>墨水</p>
    <p class="">{{ text }}</p>
  </div>
  <div id="navbar" class="h-10 bg-gray-400 flex flex-row">
    <router-link to="/">Home</router-link>
    <router-link to="/jokes"> Jokes</router-link>
    <router-link to="/new">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      New Post</router-link
    >

    <router-link v-if="store.user === ''" to="/login"> Login</router-link>
    <button v-else @click="logout">Logout</button>
    <!-- <p>{{ $route.path }}</p> -->
  </div>
</template>
