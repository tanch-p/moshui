<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { store } from "@/components/store.js";
import { useRouter, useRoute } from "vue-router";
import JokeGrid from "@/components/jokes/JokeGrid.vue";
import Comments from "@/components/Comments.vue";
import dayjs from "dayjs";
import ShowDropdown from "@/components/ShowDropdown.vue";

const router = useRouter();
const route = useRoute();

const joke = ref({});
const dataReady = ref(false);

const userUpvoted = ref(false);
const userFavorited = ref(false);
const upvoteId = ref("");

const postDate = ref("");
const toggleDropdown = ref(false);
const isAdmin = ref(false);

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    Authorization: store.token,
  },
};

const handleUpvote = async () => {
  if (!userUpvoted.value) {
    if (store.user !== "") {
      // console.log("upvote");
      try {
        const response = await axios.post(
          "/api/upvotes/new",
          { id: joke.value._id, item: "joke" },
          axiosConfig
        );
        userUpvoted.value = true;
        upvoteId.value = response.data.data._id;
        joke.value.upvotes.push(upvoteId.value);
        // alert("successfully upvoted");
      } catch (err) {
        console.log(err);
      }
    } else {
      router.push(`/login`);
    }
  } else {
    try {
      const response = await axios.delete(
        `/api/upvotes/${upvoteId.value}`,
        axiosConfig
      );
      userUpvoted.value = false;
      joke.value.upvotes = joke.value.upvotes.filter((ele) => {
        return ele !== upvoteId.value;
      });
      upvoteId.value = "";
      // alert("successfully un-upvoted");
    } catch (err) {
      console.log(err);
    }
  }
};

const handleFavorite = async () => {
  if (!userFavorited.value) {
    if (store.user !== "") {
      // console.log("fav");
      try {
        const response = await axios.put(
          `/api/users/addFavorite/${joke.value._id}`,
          {},
          axiosConfig
        );
        console.log(response);
        userFavorited.value = true;
        // alert("successfully favorited");
      } catch (err) {
        console.log(err);
      }
    } else {
      router.push(`/login`);
    }
  } else {
    try {
      const response = await axios.put(
        `/api/users/removeFavorite/${joke.value._id}`,
        {},
        axiosConfig
      );
      console.log(response);
      userFavorited.value = false;
      // alert("successfully un-favorited");
    } catch (err) {
      console.log(err);
    }
  }
};

onMounted(async () => {
  try {
    const jokeResponse = await axios.get(`/api/jokes/${route.params.id}`);
    // console.log(response.data.data);
    joke.value = jokeResponse.data.data;
    dataReady.value = true;
    postDate.value = dayjs(joke.value.updatedAt).format("DD-MMM-YYYY");
    if (store.token !== "") {
      const response = await axios.get(
        `/api/upvotes/${joke.value._id}/${store.token}`
      );
      // console.log(response.data.data);
      if (response.data.data) {
        // console.log("here");
        userUpvoted.value = true;
        upvoteId.value = response.data.data._id;
      }
      const favResponse = await axios.get(
        `/api/users/${store.user}/favorites`,
        axiosConfig
      );
      console.log(favResponse);
      console.log(joke.value._id);
      if (favResponse.data.data.favorites.includes(joke.value._id)) {
        console.log("here");
        userFavorited.value = true;
      }
      if (store.user === "admin") {
        isAdmin.value = true;
      }
    }
  } catch (err) {
    console.log(err);
  }
});

const deleteJoke = async () => {
  try {
    const response = await axios.delete(
      `/api/jokes/${route.params.id}`,
      axiosConfig
    );
    router.replace("/");
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div
    v-if="dataReady"
    id="joke-show-container"
    class="flex flex-wrap flex-col md:w-[50%] mx-auto my-20"
  >
    <div
      id="joke-show-header-container"
      class="flex flex-wrap flex-row items-center justify-between"
    >
      <div class="flex flex-wrap items-center">
        <div
          class="
            h-[32px]
            w-[32px]
            rounded-full
            bg-slate-300
            hover:cursor-pointer
          "
        >
          <p class="mx-auto mt-1 font-bold text-center align-middle">
            {{ joke?.author?.username[0]?.toUpperCase() ?? "?" }}
          </p>
        </div>
        <div class="grid grid-rows-2">
          <div>{{ joke?.author?.username ?? "deleted user" }}</div>
          <div>Posted: {{ postDate }}</div>
        </div>
      </div>
      <div id="joke-show-controls" class="flex flex-wrap ml-auto">
        <div class="flex flex-wrap flex-row items-center mx-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Upvote</title>
            <path
              fill="currentColor"
              @click="handleUpvote"
              :class="[
                'comment hover:fill-green-400',
                { 'fill-green-600': userUpvoted },
              ]"
              stroke="#ffffff"
              stroke-width="0"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.197 2.524a1.2 1.2 0 011.606 0c.521.46 1.302 1.182 2.363 2.243a29.617 29.617 0 012.423 2.722c.339.435.025 1.028-.526 1.028h-2.397v4.147c0 .524-.306.982-.823 1.064-.417.066-1.014.122-1.843.122s-1.427-.056-1.843-.122c-.517-.082-.824-.54-.824-1.064V8.517H2.937c-.552 0-.865-.593-.527-1.028.52-.669 1.32-1.62 2.423-2.722a52.996 52.996 0 012.364-2.243z"
            ></path>
          </svg>
          <div class="font-medium">
            {{ joke.upvotes.length }}
          </div>
        </div>
        <div class="flex flex-wrap flex-row mx-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              @click="handleFavorite"
              :class="[
                'favorite hover:fill-pink-500',
                { 'fill-pink-400': userFavorited },
              ]"
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div class="mr-20">
        <div
          v-if="store.user === joke?.author?.username || store.user === 'admin'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 hover:cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            stroke-width="2"
            @click="() => (toggleDropdown = !toggleDropdown)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
          <div
            v-if="toggleDropdown"
            class="
              origin-top-right
              absolute
              mt-2
              w-min
              rounded-md
              shadow-lg
              bg-white
              ring-1 ring-black ring-opacity-5
              focus:outline-none
              z-30
            "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <ShowDropdown
              :toggleDropdown="toggleDropdown"
              :jokeAuthor="joke?.author?.username"
              :jokeId="joke._id"
              @unmountDropdown="() => (toggleDropdown = !toggleDropdown)"
              @delete="deleteJoke"
            />
          </div>
        </div>
      </div>
    </div>
    <div id="joke-show-main" class="w-[90%] mx-auto md:mx-0">
      <JokeGrid
        v-if="dataReady"
        :joke="joke"
        :key="joke._id"
        :globalShow="true"
        :controls="false"
      />
    </div>
    <Comments :joke="joke"></Comments>
  </div>
</template>
