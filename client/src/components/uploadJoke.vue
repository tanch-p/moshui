<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { store } from "../components/store.js";
import { debounce } from "lodash-es";
import axios from "axios";

const props = defineProps({
  edit: Boolean,
  prevSetup: String,
  prevPunchline: String,
});

const router = useRouter();
const route = useRoute();

const setup = ref(props.prevSetup ?? "hello");
const punchline = ref(props.prevPunchline ?? "world");
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

const editJoke = async () => {
  if (setup.value !== "") {
    const editedJoke = {
      setup: setup.value,
      punchline: punchline.value,
      tags: tags.value,
    };
    try {
      const response = await axios.put(
        `/api/jokes/${route.params.id}`,
        editedJoke,
        axiosConfig
      );

      alert("Joke successfully edited");
      router.go(-1);
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
  <div class="flex flex-wrap flex-row w-full h-full">
    <form @submit.prevent="onSubmit" class="w-[50%] h-full">
      <div
        class="
          flex flex-wrap flex-col
          border border-gray-400 border-r-slate-400
          h-full
          bg-slate-100
        "
      >
        #Setup<textarea
          class="
            resize-none
            w-full
            focus:outline-none
            font-serif
            h-[35%]
            bg-slate-100
          "
          v-model="setup"
          placeholder="type here"
        ></textarea>
        #Punchline<textarea
          class="
            resize-none
            w-full
            focus:outline-none
            font-serif
            h-[35%]
            bg-slate-100
          "
          v-model="punchline"
          placeholder="type here"
        ></textarea>
      </div>
    </form>
    <div
      class="
        bg-neutral-700
        text-white text-[40px]
        font-bold
        w-[50%]
        border border-gray-400 border-collapse
        break-words
        whitespace-pre-wrap
      "
    >
      <p class="">{{ setup }}</p>
      <p class="text-right mt-8">{{ punchline }}</p>
    </div>
    <div
      class="
        mt-auto
        flex flex-row
        py-2
        border
        w-full
        border-slate-600
        bg-white
        over
      "
    >
      <div
        v-for="(tag, index) in tags"
        :key="tag"
        class="
          border
          rounded-xl
          bg-gray-200
          pr-2
          pl-1
          pb-0.5
          mx-1
          text-gray-600
          whitespace-nowrap
        "
      >
        <span
          @click="removeTag(index)"
          class="mx-1 text-black font-semibold hover:text-neutral-400"
          >x</span
        >
        {{ tag }}
      </div>
      <input
        type="text"
        class="focus:outline-none w-full"
        v-model="tag"
        @keydown.enter="addTag"
        @keydown.188="addTag"
        placeholder="Enter a Tag"
      />
    </div>
    <button
      v-if="edit"
      type="button"
      @click="editJoke"
      class="border rounded-lg bg-gray-400 hover:bg-gray-300 px-2 py-1"
    >
      Edit
    </button>
    <button
      v-else
      type="button"
      @click="addJoke"
      class="border rounded-lg bg-gray-400 hover:bg-gray-300 px-2 py-1"
    >
      Submit
    </button>
  </div>
</template>
