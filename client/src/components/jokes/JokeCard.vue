<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { store } from "../store.js";
import { useRouter } from "vue-router";
const props = defineProps({
  joke: Object,
  globalShow: Boolean,
});
const router = useRouter();

const localShow = ref(false);
const hoverComment = ref(false);
const hoverViews = ref(false);

const userUpvoted = ref(false);

const handleUpvote = async () => {
  if (!userUpvoted.value) {
    if (store.user !== "") {
      console.log("upvote");
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: store.token,
        },
      };
      try {
        const response = await axios.post(
          "http://localhost:3001/api/upvotes/new",
          { id: props.joke._id, item: "joke" },
          axiosConfig
        );
        userUpvoted.value = true;
        alert("successfully upvoted");
      } catch (err) {
        console.log(err);
      }
    } else {
      router.push(`/jokes/${props.joke._id}`);
    }
  }
};

onMounted(async () => {
  if (store.token !== "") {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/upvotes/${props.joke._id}/${store.token}`
      );
      // console.log(response.data.data);
      if (response.data.data) {
        console.log("here")
        userUpvoted.value = true;
      }
    } catch (err) {
      console.log(err);
    }
  }
});
</script>

<template>
  <div className="rounded-lg bg-gray-500 p-4 break-inside">
    <div class="flex flex-wrap flex-col lg:w-[200px]">
      <div>{{ joke.setup }}</div>
      <div>
        <h1 v-if="globalShow || localShow">
          {{ joke.punchline }}
        </h1>
        <button v-else @click="localShow = !localShow">>Reveal Answer</button>
      </div>
      <div class="Post-item-info flex flex-wrap flex-row">
        <div class="flex flex-wrap flex-row">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            @click="handleUpvote"
          >
            <title>Upvote</title>
            <path
              fill="currentColor"
              :class="['hover:fill-green-600', { active: userUpvoted }]"
              stroke="#ffffff"
              stroke-width="0"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.197 2.524a1.2 1.2 0 011.606 0c.521.46 1.302 1.182 2.363 2.243a29.617 29.617 0 012.423 2.722c.339.435.025 1.028-.526 1.028h-2.397v4.147c0 .524-.306.982-.823 1.064-.417.066-1.014.122-1.843.122s-1.427-.056-1.843-.122c-.517-.082-.824-.54-.824-1.064V8.517H2.937c-.552 0-.865-.593-.527-1.028.52-.669 1.32-1.62 2.423-2.722a52.996 52.996 0 012.364-2.243z"
            ></path>
          </svg>
          <div
            class="MediaBody Post-item-vote-points Post-item-vote-points--false"
          >
            {{ joke.upvotes.length }}
          </div>
        </div>
        <div
          @mouseover="hoverComment = true"
          @mouseleave="hoverComment = false"
          class="flex flex-wrap flex-row"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Comments</title>
            <path
              fill="currentColor"
              :class="[hoverComment ? 'fill-neutral-400' : '']"
              stroke="#ffffff"
              stroke-width="0"
              d="M4.455 12.195l.367 1.105 1.037-.53c.266-.135.637-.412 1.039-.74.39-.319.872-.737 1.422-1.245h2.291a3.306 3.306 0 003.306-3.306V5.306A3.306 3.306 0 0010.611 2H5.306A3.306 3.306 0 002 5.306v2.656c0 1.34.933 2.461 2.185 2.75.008.172.025.335.046.479a6.622 6.622 0 00.168.803c.016.07.035.137.056.2z"
            ></path>
          </svg>
          <div :class="[hoverComment ? 'text-neutral-400' : '']">12</div>
        </div>
        <div
          @mouseover="hoverViews = true"
          @mouseleave="hoverViews = false"
          class="flex flex-wrap flex-row"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Post views</title>
            <path
              :class="[hoverViews ? 'fill-neutral-400' : '']"
              d="M8 2.5C4.74998 2.5 2.30142 5.50267 1.27514 6.77517C0.925337 7.20917 0.908553 7.76483 1.2278 8.16583C2.22527 9.41833 4.6991 12.5 8 12.5C11.3686 12.5 13.8396 9.31133 14.796 8.0905C15.0769 7.732 15.0674 7.2535 14.7692 6.8755C13.7938 5.6395 11.3376 2.5 8 2.5ZM7.98224 9.33333C6.90897 9.33333 6.03887 8.51233 6.03887 7.5C6.03887 6.4875 6.90897 5.66667 7.98224 5.66667C9.05551 5.66667 9.92561 6.4875 9.92561 7.5C9.92561 8.51233 9.05551 9.33333 7.98224 9.33333Z"
              fill="currentColor"
            ></path>
          </svg>
          <div :class="[hoverViews ? 'text-neutral-400' : '']">5K</div>
        </div>
      </div>
    </div>
  </div>
  {{userUpvoted}}
</template>

<style>
.active {
  fill: #16a34a;
}
</style>