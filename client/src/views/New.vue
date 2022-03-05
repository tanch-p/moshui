<script setup>
import { debounce } from "lodash";
import { ref, computed } from "vue";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();

const input = ref("");




function addJoke() {
  console.log(input.value);

  router.push({ name: "Home"});
}
</script>



<template>
  <main>
    <h1>Create New Joke</h1>
    <form @submit.prevent="onSubmit">
      <textarea class="border" v-model="input"></textarea>
      <button @click="addJoke">Add Joke</button>
    </form>
  </main>
</template>
