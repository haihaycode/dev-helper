<template>
  <a-button
    v-bind="$attrs"
    :class="[customClass, buttonClass]"
    :loading="loading"
    :disabled="disabled"
    :style="buttonStyle"
    :type="buttonType"
    :icon="icon"
    :size="size"
  >
    {{ loadingText || $slots.default }}
  </a-button>
</template>

<script>
import { defineComponent } from "vue";
import { Button as AntButton } from "ant-design-vue";

export default defineComponent({
  name: "AntButton",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntButton,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
    buttonClass: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: "Loading...",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonType: {
      type: String,
      default: "default", // 'primary', 'dashed', 'link', 'text'
    },
    icon: {
      type: [String, Object],
      default: null, // You can pass an icon component or string like "search"
    },
    size: {
      type: String,
      default: "middle", // 'small', 'middle', 'large'
    },
    color: {
      type: String,
      default: "", // For background color
    },
    textColor: {
      type: String,
      default: "", // For text color
    },
  },
  computed: {
    buttonStyle() {
      let style = {};
      if (this.color) {
        style.backgroundColor = this.color;
        style.borderColor = this.color;
      }
      if (this.textColor) {
        style.color = this.textColor;
      }
      return style;
    },
  },
});
</script>

<style scoped>
/* Có thể thêm các style tùy chỉnh cho Button ở đây */
</style>
