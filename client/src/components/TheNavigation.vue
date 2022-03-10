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
  <div class="absolute left-[47%] select-none w-16 md:w-28">
    <img class="inline-block" src="@/assets/icon.jpg" alt="icon" />
  </div>
  <div
    id="navbar"
    class="h-[10vh] mb-4 flex flex-row items-center text-black max-w-[100vw]"
  >
    <router-link
      to="/"
      class="
        md:mx-2
        bg-gray-100
        font-bold
        text-center
        py-1
        px-2
        border
        rounded-lg
      "
      >Home</router-link
    >
    <!-- <router-link to="/jokes"> Jokes</router-link> -->
    <router-link to="/new">
      <div
        class="
          flex flex-wrap flex-row
          justify-center
          bg-green-500
          hover:bg-green-400
          md:w-[110px]
          px-1
          md:px-0
          py-[6px]
          rounded-md
          font-semibold
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="md:h-6 md:w-6 h-0 w-0"
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
        <p class="pl-1">New post</p>
      </div></router-link
    >

    <!-- <div class="ml-auto invisible">Search</div> -->
    <div class="ml-auto mr-1 select-none">
      <div v-if="store.user === ''">
        <router-link to="/login"
          ><button class="mr-1 md:w-[80px] h-[35px] font-bold">
            Sign in
          </button></router-link
        >
        <router-link to="/signup"
          ><button
            class="
              bg-green-500
              hover:bg-green-400
              md:w-[90px]
              w-0
              h-0
              invisible
              md:visible md:h-[35px]
              px-1
              md:px-0
              rounded-md
              font-bold
            "
          >
            Sign up
          </button></router-link
        >
      </div>

      <div v-else class="flex flex-wrap flex-row">
        <div
          @click="() => (toggleDropdown = !toggleDropdown)"
          class="
            h-[50px]
            w-[50px]
            rounded-full
            bg-lime-200
            hover:cursor-pointer
            relative
          "
        >
          <p class="mx-auto mt-2.5 font-bold text-lg text-center align-middle">
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
