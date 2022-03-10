<script setup>
import { ref, onMounted } from "vue";
import { store } from "./store.js";
import axios from "axios";

const props = defineProps({
  comment: Object,
});

const commentInput = ref("");
</script>

<template>
  <div class="w-full border-b border-black">
    {{comment.author.username}}: {{ comment.comment }}

  </div>
</template>