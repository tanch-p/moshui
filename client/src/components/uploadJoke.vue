<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { store } from "../components/store.js";

const router = useRouter();
const route = useRoute();

const setup = ref("");
const punchline = ref("");

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Authorization: store.token,
  },
};

const addJoke = async () => {
  const newJoke = {
    setup: setup.value,
    punchline: punchline.value,
  };
  try {
    const response = await axios.post(
      "http://localhost:3001/api/jokes/new",
      newJoke,
      axiosConfig
    );

    alert("Joke successfully created");
  } catch (err) {
    console.log(err);
  }
  // router.push({ name: "Home" });
};
</script>



<template>
  <main>
    <h1>Create New Joke</h1>
    <form @submit.prevent="onSubmit">
      <textarea class="border" v-model="setup"></textarea>
      <textarea class="border" v-model="punchline"></textarea>
      <button @click="addJoke">Add Joke</button>
    </form>
  </main>
</template>
