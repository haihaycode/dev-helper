<template>
  <a-row v-bind="$attrs" :class="customClass">
    <slot></slot>
  </a-row>
</template>

<script>
import { defineComponent } from "vue";
import { Row as AntRow } from "ant-design-vue";

export default defineComponent({
  name: "AntRow",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntRow,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
