<template>
  <a-button
    v-bind="$attrs"
    :class="[customClass, buttonClass]"
    :loading="loading"
    :disabled="disabled"
    :style="buttonStyle"
    :type="buttonType"
    :icon="iconComponent"
    :size="size"
  >
    <template v-if="!loading">{{ loadingText || $slots.default }}</template>
  </a-button>
</template>

<script>
import { defineComponent, h } from "vue";
import { Button as AntButton } from "ant-design-vue";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons-vue"; // Example icons

export default defineComponent({
  name: "AntButton",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntButton,
    // eslint-disable-next-line vue/no-unused-components
    SearchOutlined,
    // eslint-disable-next-line vue/no-unused-components
    PlusOutlined, // Example icons
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
      default: "... ",
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
    iconComponent() {
      if (typeof this.icon === "string") {
        // If icon is a string, return the corresponding icon component
        switch (this.icon) {
          case "search":
            return h(SearchOutlined);
          case "plus":
            return h(PlusOutlined);
          // Add more cases for other icons as needed
          default:
            return null;
        }
      }
      return this.icon; // If icon is an object, return it directly
    },
  },
});
</script>

<style scoped>
/* Có thể thêm các style tùy chỉnh cho Button ở đây */
</style>
