<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { store } from "../components/store.js";
import { debounce } from "lodash-es";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const setup = ref("");
const punchline = ref("");

const output = computed(() => setup.value);

const update = debounce((e) => {
  input.value = e.target.value;
}, 100);

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Authorization: store.token,
  },
};

const value = ref("test");

const addJoke = async () => {
  const newJoke = {
    setup: setup.value,
    punchline: punchline.value,
  };
  try {
    const response = await axios.post("/api/jokes/new", newJoke, axiosConfig);

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
    <div class="flex flex-wrap flex-row">
      <form @submit.prevent="onSubmit">
        <div class="flex flex-wrap flex-col border border-gray-400 border-r-slate-400">
          Setup:<textarea
            class="border resize-none w-[200px]"
            v-model="setup"
          ></textarea>
          Punchline:<textarea
            class="border resize-none w-[200px]"
            v-model="punchline"
          ></textarea>
        </div>
        <button @click="addJoke">Submit</button>
      </form>
      <div class="break-words w-[200px] border border-gray-400 border-collapse">
        <div >{{ setup }}</div>
        <div class=" text-right">{{ punchline }}</div>
      </div>
    </div>
  </main>
</template>
