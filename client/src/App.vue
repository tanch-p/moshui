<script setup>
import TheNavigation from "@/components/TheNavigation.vue";
import {ref} from 'vue'
const App = ref(null)
</script>

<template>
  <TheNavigation></TheNavigation>
  <div>
    <router-view ref="App"></router-view>
  </div>
</template>
