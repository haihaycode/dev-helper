<template>
  <a-alert
    v-bind="$attrs"
    :class="customClass"
    :message="message"
    :type="type"
    :show-icon="showIcon"
  />
</template>

<script>
import { defineComponent } from "vue";
import { Alert as AntAlert } from "ant-design-vue";

export default defineComponent({
  name: "AntAlert",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntAlert,
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
    type: {
      type: String,
      default: "info", // 'success', 'info', 'warning', 'error'
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
