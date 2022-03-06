<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { reactive } from "vue";
import { store } from "../components/store.js";

const username = ref("");
const password = ref("");
const msg = ref("");
const router = useRouter();
const route = useRoute();
const handleLogin = async () => {
  console.log("hi");

  msg.value = "";
  const loginParams = {
    username: username.value,
    password: password.value,
  };
  try {
    const response = await axios.post(
      "http://localhost:3001/api/users/login",
      loginParams
    );
    alert("Successful login.");
    store.token = response?.data?.data;
    console.log(response.data);
    store.user = username;
    router.go(-1);
  } catch (err) {
    console.log(err);
  }
};
const login = () => {
  window.user = username.value;
  const redirectPath = route.query.redirect || "/protected";
  router.push(redirectPath);
};
</script>

<template>
  <form @submit.prevent="onSubmit" @submit="handleLogin">
    Username
    <input v-model="username" placeholder="username" />
    Password
    <input v-model="password" placeholder="password" />
    <button type="submit">Submit</button>
  </form>
  <p>New to us? <router-link to="/signup"> Signup</router-link> here!</p>
</template>