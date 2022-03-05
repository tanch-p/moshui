<script>
import TheNavigation from "@/components/TheNavigation.vue";
export default {
  components: { TheNavigation },
};

</script>

<template>
  <TheNavigation></TheNavigation>
  <div>
    <router-view></router-view>
  </div>
</template>
