<!-- eslint-disable vue/no-unused-components -->
<template>
  <div class="home-page">
    <AntText class="">
      <h1 :class="animation">Home Page</h1>
    </AntText>
  </div>
</template>
<script lang="ts"></script>

<script setup lang="ts">
import AntText from "@/components/container/AntText.vue";
import { ref, effect } from "vue";
import store from "@/store";
const animation = ref("");

effect(() => {
  animation.value = "zoomInDown";
});
</script>

<style scoped lang="stylus">
.home-page
  display flex
  justify-content center
  align-items center
  height 100vh
</style>
