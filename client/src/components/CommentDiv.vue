<script setup>
import { ref, onMounted } from "vue";
import { store } from "./store.js";
import axios from "axios";
import dayjs from "dayjs";

const props = defineProps({
  comment: Object,
  jokeId: String,
  allComments: Array,
});

const date = ref(dayjs(props.comment.updatedAt).format("DD-MMM"));
const replyOpen = ref(false);
const commentInput = ref("");
const joke = ref(props.jokeId);

onMounted(async () => {
  if (dayjs().$D === dayjs(props.comment.updatedAt).$D) {
    date.value = "Today";
  }
});

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
    item: joke.value,
    parent: props.comment._id,
  };
  try {
    const response = await axios.post(
      `/api/comments/new`,
      newComment,
      axiosConfig
    );
    console.log(response);
    props.allComments.push(response.data.data);
    commentInput.value = "";
    replyOpen.value = false;
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="w-full">
    <div class="flex flex-wrap">
      <div
        class="h-[28px] w-[28px] rounded-full bg-lime-200 hover:cursor-pointer"
      >
        <p class="mx-auto mt-0.5 font-semibold text-center align-middle">
          {{ comment.author.username[0].toUpperCase() }}
        </p>
      </div>
      <div class="flex flex-wrap flex-col">
        <div>
          {{ comment.author.username }} -
          <span
            >{{ date }} at {{ dayjs(comment.updatedAt).format("h.mma") }}</span
          >
        </div>
        <div>{{ comment.comment }}</div>
        <div v-if="!replyOpen" @click="() => (replyOpen = !replyOpen)">
          <span class="text-blue-600 hover:cursor-pointer">Reply</span>
        </div>

        <div v-else>
          <div v-if="store.token === ''">
            Please
            <router-link to="/login" class="text-blue-600">login</router-link>
            to be able to comment.
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
                bg-white
              "
              v-model="commentInput"
              placeholder="type here"
            ></textarea>
            <button
              type="button"
              @click="addComment"
              class="border rounded-lg bg-gray-400 hover:bg-gray-300 py-0.5"
            >
              Submit
            </button>
            <button
              type="button"
              @click="
                () => {
                  replyOpen = !replyOpen;
                }
              "
              class="border rounded-lg bg-gray-400 hover:bg-gray-300 py-0.5"
            >
              Cancel
            </button>
          </div>
        </div>
        <CommentDiv
          v-for="(comment, index) in allComments.filter(
            (ele) => ele.parent === comment._id
          )"
          :comment="comment"
          :allComments="allComments"
          :jokeId="joke"
          :key="comment._id"
        ></CommentDiv>
      </div>
    </div>
  </div>
</template>