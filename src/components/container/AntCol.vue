<template>
  <a-col v-bind="$attrs" :class="customClass">
    <slot></slot>
  </a-col>
</template>

<script>
import { defineComponent } from "vue";
import { Col as AntCol } from "ant-design-vue";

export default defineComponent({
  name: "AntCol",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntCol,
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
