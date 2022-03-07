<script setup>
import { ref, watch, computed, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { store } from "../components/store.js";

const router = useRouter();
const route = useRoute();

let language = "cn";
const header = ref(language !== "cn");
const text = ref(`${language}`);
const dropdownTheme = ref(
  "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300 w-full text-left"
);

// watchEffect(() => route.path, console.log(route.path));

const toggleDropdown = ref(false);

const logout = () => {
  store.user = "";
  store.token = "";
  router.go(0);
};

// watch(toggleDropdown, () => {
//   if (toggleDropdown) {
//     window.addEventListener(
//       "click",
//       () => (toggleDropdown.value = !toggleDropdown.value)
//     );
//   }
// });
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
    <div class="ml-auto mr-4 select-none">
      <router-link v-if="store.user === ''" to="/login"> Login</router-link>
      <div v-else class="flex flex-wrap flex-row">
        <span class="font-semibold mr-2">{{ store.user }}</span>
        <div
          @click="() => (toggleDropdown = !toggleDropdown)"
          class="
            md:h-[37px] md:w-[37px]
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
            <div className="py-1 w-full z-30">
              <router-link
                to="/"
                :class="dropdownTheme"
                role="menuitem"
                tabIndex="-1"
                >Posts</router-link
              >
              <router-link
                to="/"
                :class="dropdownTheme"
                role="menuitem"
                tabIndex="-1"
                >Favorites</router-link
              >
              <button @click="logout" :class="dropdownTheme">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <p>{{ $route.path }}</p> -->
  </div>
</template>
