<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { store } from "@/components/store.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Authorization: store.token,
  },
};

onMounted(async () => {
  try {
    const response = await axios.get(
      `/api/users/jokes`,
      axiosConfig
    );
    console.log(response.data.data);
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <main>
    <h1>user posts</h1>
  </main>
</template>
