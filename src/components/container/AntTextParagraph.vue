<template>
  <p :class="customClass" :style="customStyle">
    <slot></slot>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AntTextParagraph",
  props: {
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