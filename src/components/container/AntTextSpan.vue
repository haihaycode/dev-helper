<template>
  <span :class="customClass" :style="customStyle">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AntTextSpan",
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