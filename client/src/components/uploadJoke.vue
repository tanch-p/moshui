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
const tags = ref([]);
const tag = ref("");

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
  if (setup.value !== "") {
    const newJoke = {
      setup: setup.value,
      punchline: punchline.value,
      tags: tags.value,
    };
    try {
      const response = await axios.post("/api/jokes/new", newJoke, axiosConfig);

      alert("Joke successfully created");
      setup.value = "";
      punchline.value = "";
      tags.value = [];
    } catch (err) {
      console.log(err);
    }
    // router.push({ name: "Home" });
  }
};

const addTag = () => {
  if (tag.value.trim().length > 0) {
    if (!tags.value.includes(tag.value.trim())) {
      tags.value.push(tag.value.trim());
      tag.value = "";
    }
  }
};

const removeTag = (index) => {
  tags.value.splice(index, 1);
};
</script>



<template>
  <main>
    <h1>Create New Joke</h1>
    <div class="flex flex-wrap flex-row">
      <form @submit.prevent="onSubmit">
        <div
          class="
            flex flex-wrap flex-col
            border border-gray-400 border-r-slate-400
          "
        >
          Setup:<textarea
            class="border resize-none w-[200px]"
            v-model="setup"
          ></textarea>
          Punchline:<textarea
            class="border resize-none w-[200px]"
            v-model="punchline"
          ></textarea>
          <div class="tag-input">
            <div v-for="(tag, index) in tags" :key="tag" class="tag-input__tag">
              <span @click="removeTag(index)">x</span>
              {{ tag }}
            </div>
            <input
              type="text"
              class=""
              v-model="tag"
              @keydown.enter="addTag"
              @keydown.188="addTag"
              placeholder="Enter a Tag"
            />
          </div>
        </div>

        <button type="button" @click="addJoke">Submit</button>
      </form>
      <div class="break-words w-[200px] border border-gray-400 border-collapse">
        <div>{{ setup }}</div>
        <div class="text-right">{{ punchline }}</div>
      </div>
    </div>
  </main>
</template>
