<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { store } from "../store.js";
import { useRouter } from "vue-router";
const props = defineProps({
  controls: Boolean,
  size: Object,
  joke: Object,
});
const router = useRouter();

const localShow = ref(false);
const hoverComment = ref(false);

const userUpvoted = ref(false);
const userFavorited = ref(false);
const upvoteId = ref("");

const randomBgColor = (num) => {
  const lightColors = [
    "red",
    "sky",
    "emerald",
    "orange",
    "amber",
    "lime",
    "rose",
  ];
  const darkColors = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",

    "sky",
    "indigo",
    "purple",
    "blue",
    "teal",
    "green",
    "lime",

    "rose",
  ];
  const darkIntensity = (Math.ceil(Math.random() * 3) * 100 + 500)
    .toString()
    .trim();
  const lightIntensity = (Math.ceil(Math.random() * 3) * 100 + 200)
    .toString()
    .trim();

  if (num === 1) {
    return `bg-${
      darkColors[Math.floor(Math.random() * darkColors.length)]
    }-${darkIntensity}`;
  } else {
    return `bg-${
      lightColors[Math.floor(Math.random() * lightColors.length)]
    }-${lightIntensity}`;
  }
};

const bgColor = ref(randomBgColor(Math.ceil(Math.random() * 2)));

onMounted(async () => {
  if (store.token !== "") {
    try {
      const response = await axios.get(
        `/api/upvotes/${props.joke._id}/${store.token}`
      );
      // console.log(response.data.data);
      if (response.data.data) {
        // console.log("here");
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
    :class="[
      'rounded-lg pt-4 w-full',
      bgColor,
    ]"
    @click="handleJokeClick"
    data-name="jokeShow"
  >
    <div class="flex flex-wrap flex-col w-full">
      <p
        data-name="jokeShow"
        class="
          text-white
          font-bold
          whitespace-pre-wrap
          text-[24px]
          lg:text-[32px]
          px-4
        "
      >
        {{ joke.setup }}
      </p>
      <div>
        <p
          data-name="jokeShow"
          class="
            text-right text-white
            font-bold
            whitespace-pre-wrap
            mt-4
            px-4
            text-[24px]
            lg:text-[32px]
          "
        >
          {{ joke.punchline }}
        </p>
      </div>
    </div>
  </div>
</template>