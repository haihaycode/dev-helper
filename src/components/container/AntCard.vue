<template>
  <a-card v-bind="$attrs" :class="customClass">
    <slot></slot>
  </a-card>
</template>

<script>
import { defineComponent } from "vue";
import { Card as AntCard } from "ant-design-vue";

export default defineComponent({
  name: "AntCard",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntCard,
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
/* Style tùy chỉnh cho Card (nếu cần) */
</style>
