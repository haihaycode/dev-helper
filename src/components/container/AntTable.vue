<template>
  <a-table v-bind="$attrs" :class="customClass">
    <slot></slot>
  </a-table>
</template>

<script>
import { defineComponent } from "vue";
import { Table as AntTable } from "ant-design-vue";

export default defineComponent({
  name: "AntTable",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntTable,
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
/* Style tùy chỉnh cho Table (nếu cần) */
</style>
