<script setup>
import { reactive, ref } from "vue";
import Card from "./components/jokes/Card.vue";

let language = "cn";
const header = ref(language !== "cn");
const text = ref(`${language}`);
const string =
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaaaaa   aaaaaaaaaaaaaa aaaaaaaaaaa bbbbbbbbbbbb cccccccccccccc      dddddddddddd eeeeeeeeee ffffffffffffffffffffffffffffff gggggggg";
const random = ref(string);

const globalShow = ref(false);

</script>

<template>
  <div class="bg-black text-white text-center">
    <p class="text-4xl" v-if="header">Moshui</p>
    <p v-else>墨水</p>
    <p class="">{{ text }}</p>
  </div>
  <div id="navbar" class="h-10 bg-gray-400">
    About
    <button @click="()=>globalShow = !globalShow">Show Answers</button>
    <div class="float-right mr-5">Login</div>
  </div>
  <div class="w-min h-min">{{ random }}</div>

  <Card :globalShow="globalShow" />
</template>