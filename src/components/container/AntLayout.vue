<template>
  <a-layout v-bind="$attrs" :class="customClass">
    <slot></slot>
  </a-layout>
</template>

<script>
import { defineComponent } from "vue";
import { Layout as AntLayout } from "ant-design-vue";

export default defineComponent({
  name: "AntLayout",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntLayout,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
});
</script>
