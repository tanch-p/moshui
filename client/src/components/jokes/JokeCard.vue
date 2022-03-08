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

const userUpvoted = ref(false);
const userFavorited = ref(false);
const upvoteId = ref("");

const handleUpvote = async () => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: store.token,
    },
  };
  if (!userUpvoted.value) {
    if (store.user !== "") {
      console.log("upvote");
      try {
        const response = await axios.post(
          "/api/upvotes/new",
          { id: props.joke._id, item: "joke" },
          axiosConfig
        );
        userUpvoted.value = true;
        upvoteId.value = response.data.data._id;
        props.joke.upvotes.push(upvoteId.value);
        alert("successfully upvoted");
      } catch (err) {
        console.log(err);
      }
    } else {
      router.push(`/jokes/${props.joke._id}`);
    }
  } else {
    try {
      const response = await axios.delete(
        `/api/upvotes/${upvoteId.value}`,
        axiosConfig
      );
      userUpvoted.value = false;
      props.joke.upvotes = props.joke.upvotes.filter((ele) => {
        ele !== upvoteId.value || ele?.value !== upvoteId.value;
      });
      upvoteId.value = "";
      alert("successfully un-upvoted");
    } catch (err) {
      console.log(err);
    }
  }
};

const handleFavorite = () => {
  console.log("fav");
};

onMounted(async () => {
  if (store.token !== "") {
    try {
      const response = await axios.get(
        `/api/upvotes/${props.joke._id}/${store.token}`
      );
      console.log(response.data.data);
      if (response.data.data) {
        console.log("here");
        userUpvoted.value = true;
        upvoteId.value = response.data.data._id;
      }
    } catch (err) {
      console.log(err);
    }
  }
});

const handleJokeClick = (e) => {
  if (e.target.dataset.name === "jokeShow") {
    router.push(`/jokes/${props.joke._id}`);
  }
};
</script>

<template>
  <div
    class="rounded-lg bg-gray-500 p-4 break-inside hover:cursor-pointer"
    @click="handleJokeClick"
    data-name="jokeShow"
  >
    <div class="flex flex-wrap flex-col lg:w-[200px]">
      <p class="" data-name="jokeShow">{{ joke.setup }}</p>
      <div>
        <p
          v-if="globalShow || localShow"
          class="text-right"
          data-name="jokeShow"
        >
          {{ joke.punchline }}
        </p>
        <button v-else @click="localShow = !localShow">>Reveal Answer</button>
      </div>
      <div class="Post-item-info flex flex-wrap flex-row">
        <div class="flex flex-wrap flex-row">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Upvote</title>
            <path
              fill="currentColor"
              @click="handleUpvote"
              :class="['comment hover:fill-green-600', { active: userUpvoted }]"
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
        <div class="flex flex-wrap flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              @click="handleFavorite"
              :class="[
                'favorite hover:fill-pink-600',
                { active: userFavorited },
              ]"
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
  {{ userUpvoted }}
</template>

<style>
.comment.active {
  fill: #158a40;
}

.favorite.active {
  fill: rgb(219 39 119);
}
</style>