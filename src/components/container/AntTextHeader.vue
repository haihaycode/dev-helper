<template>
  <component :is="tag" :class="customClass" :style="customStyle">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AntTextHeader",
  props: {
    tag: {
      type: String,
      default: "h1", // Default to h1, can be h1, h2, h3, etc.
    },
    customClass: {
      type: String,
      default: "",
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style scoped>
/* Add any additional styles here */
</style>