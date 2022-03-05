<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const msg = ref("");
const router = useRouter();
const route = useRoute();
const handleSubmit = async () => {
  console.log("hi");
  if (password.value !== confirmPassword.value) {
    msg.value = "passwords do not match";
  } else {
    msg.value = "";
    const newUser = {
      username: username.value,
      password: password.value,
    };
    await axios
      .post("http://localhost:3001/api/users/new", newUser)
      .then((response) => {
        alert("Account successfully created.");
        router.replace("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const login = () => {
  window.user = username.value;
  const redirectPath = route.query.redirect || "/protected";
  router.push(redirectPath);
};
</script>

<template>
  <p class="text-red-500">{{ msg }}</p>
  <div class="flex flex-wrap flex-col">
    <form @submit.prevent="onSubmit" @submit="handleSubmit">
      <div>
        Username
        <input v-model="username" />
      </div>
      <div>
        Password
        <input v-model="password" />
      </div>
      <div>
        Confirm Password

        <input v-model="confirmPassword" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>