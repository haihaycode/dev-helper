<template>
  <a-typography-text
    v-bind="$attrs"
    :class="customClass"
    :type="type"
    :disabled="disabled"
    :mark="mark"
    :code="code"
    :keyboard="keyboard"
    :underline="underline"
    :strong="strong"
  >
    <slot></slot>
  </a-typography-text>
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
    type: {
      type: String,
      default: "secondary", // 'secondary', 'success', 'warning', 'danger'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mark: {
      type: Boolean,
      default: false,
    },
    code: {
      type: Boolean,
      default: false,
    },
    keyboard: {
      type: Boolean,
      default: false,
    },
    underline: {
      type: Boolean,
      default: false,
    },
    strong: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
