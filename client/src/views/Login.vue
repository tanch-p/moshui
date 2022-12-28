<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { reactive } from "vue";
import { store } from "../components/store.js";

const username = ref("");
const password = ref("");
const msg = ref("");
const passwordType = ref("password");
const router = useRouter();

const handleLogin = async () => {
  msg.value = "";
  const loginParams = {
    username: username.value,
    password: password.value,
  };
  try {
    const response = await axios.post("/api/users/login", loginParams);
    // alert("Successful login.");
    store.token = response?.data?.data;
    store.user = username;
    router.go(-1);
    router.push("/");
  } catch (err) {
    console.log(err);
    msg.value = "Email/Password is incorrect";
  }
};
</script>

<template>
  <div class="flex flex-none items-center h-[70vh]">
    <div
      class="flex flex-wrap flex-col md:items-center mx-auto md:w-[990px]"
    >
      <p class="text-red-500">{{ msg }}</p>
      <h2>Login to your account</h2>
      <div class="flex flex-wrap flex-col my-2 w-[40%] relative text-center ">
        <form @submit.prevent="onSubmit" @submit="handleLogin">
          <div class="flex flex-row w-full border-2 rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 m-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              class="md:w-[90%] pl-2 ring-0 outline-none bg-white"
              v-model="username"
              placeholder="username"
            />
          </div>
          <div class="flex flex-row my-2 w-full border-2 rounded-sm bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 m-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              class="md:w-[80%] pl-2 outline-none"
              :type="passwordType"
              v-model="password"
              placeholder="password"
            />
            <button
              v-if="passwordType === 'password'"
              type="button"
              @click="() => (passwordType = 'text')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              v-else
              type="button"
              @click="() => (passwordType = 'password')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clip-rule="evenodd"
                />
                <path
                  d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                />
              </svg>
            </button>
          </div>
          <button
            type="submit"
            class="w-full bg-neutral-500 text-white rounded-md py-1.5"
          >
            Login
          </button>
        </form>
        <p class="mt-2">
          New to us?
          <router-link to="/signup" class="text-blue-600"> Sign Up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>