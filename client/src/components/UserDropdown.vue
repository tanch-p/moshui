<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { store } from "./store.js";
import { useRouter } from "vue-router";
const props = defineProps({
  toggleDropdown: Boolean,
});
const router = useRouter();
const emit = defineEmits(["unmountDropdown"]);
const dropdownTheme = ref(
  "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300 w-full text-left"
);

const logout = () => {
  store.user = "";
  store.token = "";
  router.go(0);
};

const clicks = ref(0);

const removeDropdown = () => {
  if (clicks.value !== 0) {
    emit("unmountDropdown", "hello from child");
  } else {
    clicks.value += 1;
  }
};

onMounted(() => {
  document.addEventListener("click", removeDropdown);
});
onUnmounted(() => {
  document.removeEventListener("click", removeDropdown);
});
</script>


<template>
  <div class="py-1 w-full z-30">
    <router-link
      :to="{ name: 'User Posts', params: { id: store.user } }"
      :class="dropdownTheme"
      role="menuitem"
      tabIndex="-1"
      >Posts</router-link
    >
    <router-link :to="{ name: 'User Fav', params: { id: store.user } }" :class="dropdownTheme" role="menuitem" tabIndex="-1"
      >Favorites</router-link
    >
    <button @click="logout" :class="dropdownTheme">Logout</button>
  </div>
</template>
