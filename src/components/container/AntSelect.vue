<template>
  <a-select v-bind="$attrs" :class="customClass">
    <slot></slot>
  </a-select>
</template>

<script>
import { defineComponent } from "vue";
import { Select as AntSelect } from "ant-design-vue";

export default defineComponent({
  name: "AntSelect",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntSelect,
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
/* Style tùy chỉnh cho Select (nếu cần) */
</style>
