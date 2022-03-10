<script setup>
import { ref, onMounted } from "vue";
import { store } from "../components/store.js";
import axios from "axios";
import CommentDiv from "@/components/CommentDiv.vue";

const props = defineProps({
  joke: Object,
});

const commentInput = ref("");
const dataReady = ref(false);
const allComments = ref([]);
const jokeId = ref(props.joke._id)

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Authorization: store.token,
  },
};

const addComment = async () => {
  const newComment = {
    comment: commentInput.value,
    item: props.joke._id,
    parent: props.joke._id,
  };
  try {
    const response = await axios.post(
      `/api/comments/new`,
      newComment,
      axiosConfig
    );
    console.log(response);
    allComments.value.push(response.data.data);
    commentInput.value = "";
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/comments/${props.joke._id}`);
    console.log(response);
    allComments.value = response.data.data;
    dataReady.value = true;
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div class="mt-12 md:w-[90%]">
    <p class="font-bold text-2xl border-b border-gray-700">Comments</p>

    <div v-if="store.user === ''" class="m-auto">
      Please
      <router-link to="/login" class="text-blue-600">login</router-link> to be
      able to comment.
    </div>

    <div v-else>
      <textarea
        class="
          border border-black
          resize-none
          w-full
          focus:outline-none
          font-serif
          h-[15vh]
          bg-slate-100
        "
        v-model="commentInput"
        placeholder="type here"
      ></textarea>
      <button
        type="button"
        @click="addComment"
        class="border rounded-lg bg-gray-400 hover:bg-gray-300 px-2 py-1"
      >
        Submit
      </button>
    </div>
  </div>
  <div v-if="dataReady" class="mt-2 border-t md:w-[90%] border-gray-700 bg-slate-100">
    <CommentDiv
      v-for="(comment, index) in allComments.filter(ele => ele.parent === joke._id)"
      :comment="comment"
      :allComments="allComments"
      :jokeId="jokeId"
      :key="comment._id"
    ></CommentDiv>
  </div>
</template>