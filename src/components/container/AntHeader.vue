<template>
  <a-layout-header v-bind="$attrs" :class="customClass">
    <slot></slot>
  </a-layout-header>
</template>

<script>
import { defineComponent } from "vue";
import { Layout } from "ant-design-vue";

export default defineComponent({
  name: "AntHeader",
  components: {
    "a-layout-header": Layout.Header,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
});
</script>
