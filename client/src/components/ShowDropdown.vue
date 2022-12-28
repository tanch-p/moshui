<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { store } from "./store.js";
import { useRouter } from "vue-router";
const props = defineProps({
  toggleDropdown: Boolean,
  jokeAuthor: String,
  jokeId: String,
});
const router = useRouter();
const emit = defineEmits(["unmountDropdown",'delete']);
const dropdownTheme = ref(
  "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300 w-full text-left"
);

const canDelete = ref(false);
const canEdit = ref(false);
const logout = () => {
  store.user = "";
  store.token = "";
  router.go(0);
};

const clicks = ref(0);

const emitDelete = () => {
    emit('delete', 'hello from dropdown')
}

const removeDropdown = () => {
  if (clicks.value !== 0) {
    emit("unmountDropdown", "hello from child");
  } else {
    clicks.value += 1;
  }
};

onMounted(() => {
  if (props.jokeAuthor === store.user || store.user === "admin") {
    canDelete.value = true;
  }
  if(props.jokeAuthor === store.user){
      canEdit.value=true;
  }
  document.addEventListener("click", removeDropdown);
});
onUnmounted(() => {
  document.removeEventListener("click", removeDropdown);
});
</script>


<template>
  <div class="py-1 w-full z-30">
    <router-link
      v-if="canEdit"
      :to="{ name: 'Joke Edit', params: { id: jokeId } }"
      :class="dropdownTheme"
      role="menuitem"
      tabIndex="-1"
      >Edit</router-link
    >
    <a v-if="canDelete" @click="emitDelete" :class="dropdownTheme" role="menuitem" tabIndex="-1"
      >Delete</a
    >
  </div>
</template>
