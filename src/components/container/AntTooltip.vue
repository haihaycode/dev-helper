<template>
  <a-tooltip v-bind="$attrs" :class="customClass">
    <slot></slot>
  </a-tooltip>
</template>

<script>
import { defineComponent } from "vue";
import { Tooltip as AntTooltip } from "ant-design-vue";

export default defineComponent({
  name: "AntTooltip",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntTooltip,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
});
</script>
