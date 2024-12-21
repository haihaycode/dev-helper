<template>
  <a-badge v-bind="$attrs" :class="customClass">
    <slot></slot>
  </a-badge>
</template>

<script>
import { defineComponent } from "vue";
import { Badge as AntBadge } from "ant-design-vue";

export default defineComponent({
  name: "AntBadge",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntBadge,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
});
</script>
