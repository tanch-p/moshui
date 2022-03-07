<script setup>
import { ref, watch, computed, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { store } from "../components/store.js";
import UserDropdown from "./UserDropdown.vue";

const router = useRouter();
const route = useRoute();

let language = "cn";
const header = ref(language !== "cn");
const text = ref(`${language}`);

// watchEffect(() => route.path, console.log(route.path));
const toggleDropdown = ref(false);
</script>

<template>
  <div class="bg-black text-white text-center">
    <p class="text-4xl" v-if="header">Moshui</p>
    <p v-else>墨水</p>
    <p class="">{{ text }}</p>
  </div>
  <div id="navbar" class="h-10 bg-gray-400 flex flex-row items-center">
    <router-link to="/">Home</router-link>
    <router-link to="/jokes"> Jokes</router-link>
    <div class="flex flex-wrap flex-row">
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
    </div>
    <div class="ml-auto">Search</div>
    <div class="ml-auto mr-4 select-none">
      <div v-if="store.user === ''">
        <router-link to="/login"> Sign in</router-link>
        <router-link to="/signup"> Sign up</router-link>
      </div>

      <div v-else class="flex flex-wrap flex-row">
        <span class="font-semibold mr-2">{{ store.user }}</span>
        <div
          @click="() => (toggleDropdown = !toggleDropdown)"
          class="
            h-[37px]
            w-[37px]
            rounded-full
            bg-slate-700
            hover:cursor-pointer
            relative
          "
        >
          <p class="mx-auto mt-1.5 font-bold text-center align-middle">
            {{ store.user[0].toUpperCase() }}
          </p>
          <div
            v-if="toggleDropdown"
            class="
              origin-top-right
              absolute
              right-0
              mt-2
              w-min
              rounded-md
              shadow-lg
              bg-white
              ring-1 ring-black ring-opacity-5
              focus:outline-none
              z-30
            "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <UserDropdown
              :toggleDropdown="toggleDropdown"
              @unmountDropdown="() => (toggleDropdown = !toggleDropdown)"
            ></UserDropdown>
          </div>
        </div>
      </div>
    </div>
    <!-- <p>{{ $route.path }}</p> -->
  </div>
</template>
