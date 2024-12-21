<template>
  <a-menu v-bind="$attrs" :class="customClass" mode="horizontal">
    <slot></slot>
  </a-menu>
</template>

<script>
import { defineComponent } from "vue";
import { Menu as AntMenu } from "ant-design-vue";

export default defineComponent({
  name: "AntMenu",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntMenu,
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
/* Style tùy chỉnh cho Menu (nếu cần) */
</style>
