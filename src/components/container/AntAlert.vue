<template>
  <a-alert
    v-bind="$attrs"
    :class="customClass"
    :message="message"
    :description="description"
    :type="type"
    :show-icon="showIcon"
    :closable="closable"
    :close-text="closeText"
    :banner="banner"
    :icon="iconComponent"
    v-if="icon !== 'info'"
  />
  <InfoCircleOutlined v-if="icon === 'info'" />
</template>

<script>
import { defineComponent, h } from "vue";
import { Alert as AntAlert } from "ant-design-vue";
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons-vue"; // Example icons 

export default defineComponent({
  name: "AntAlert",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntAlert,
    // eslint-disable-next-line vue/no-unused-components
    InfoCircleOutlined,
    // eslint-disable-next-line vue/no-unused-components
    CheckCircleOutlined,
    // eslint-disable-next-line vue/no-unused-components
    ExclamationCircleOutlined,
    // eslint-disable-next-line vue/no-unused-components
    CloseCircleOutlined,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "info", // 'success', 'info', 'warning', 'error'
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    closeText: {
      type: String,
      default: "",
    },
    banner: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: [String, Object],
      default: null, // You can pass an icon component or string like "info"
    },
  },
  computed: {
    iconComponent() {
      if (typeof this.icon === "string") {
        // If icon is a string, return the corresponding icon component
        switch (this.icon) {
          case "info":
            return h(InfoCircleOutlined);
          case "success":
            return h(CheckCircleOutlined);
          case "warning":
            return h(ExclamationCircleOutlined);
          case "error":
            return h(CloseCircleOutlined);
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
/* Add any additional styles here */
</style>
