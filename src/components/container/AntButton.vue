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
    :html-type="htmlType"
  >
    <div v-if="loading">{{ loadingText }}</div>
    <div v-else><slot></slot></div>
  </a-button>
</template>
<script lang="ts">
import { defineComponent, h, CSSProperties } from "vue";
import { Button as AntButton } from "ant-design-vue";
import {
  SearchOutlined,
  PlusOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "AntButton",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntButton,
    // eslint-disable-next-line vue/no-unused-components
    SearchOutlined,
    // eslint-disable-next-line vue/no-unused-components
    PlusOutlined,
    // eslint-disable-next-line vue/no-unused-components
    GoogleOutlined,
    // eslint-disable-next-line vue/no-unused-components
    FacebookOutlined,
    // eslint-disable-next-line vue/no-unused-components
    GithubOutlined,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
    buttonClass: {
      type: String,
      default:
        "w-full bg-blue-800 hover:bg-blue-600 text-white px-4 py-6 rounded transition",
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
      default: null,
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
    htmlType: {
      type: String,
      default: "button", // 'button', 'submit', 'reset'
    },
  },
  computed: {
    buttonStyle(): CSSProperties {
      let style: CSSProperties = {};
      if (this.color) {
        style.backgroundColor = this.color;
        style.borderColor = this.color;
      }
      if (this.textColor) {
        style.color = this.textColor;
      }
      return style;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    iconComponent(): any {
      if (typeof this.icon === "string") {
        switch (this.icon) {
          case "search":
            return h(SearchOutlined);
          case "plus":
            return h(PlusOutlined);
          case "google":
            return h(GoogleOutlined);
          case "facebook":
            return h(FacebookOutlined);
          case "github":
            return h(GithubOutlined);
          default:
            return null;
        }
      }
      return this.icon;
    },
  },
});
</script>
