<template>
  <a-typography-text v-bind="$attrs" :class="customClass">{{
    $slots.default
  }}</a-typography-text>
</template>

<script>
import { defineComponent } from "vue";
import { Typography } from "ant-design-vue";

export default defineComponent({
  name: "AntText",
  components: {
    "a-typography-text": Typography.Text,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
});
</script>
