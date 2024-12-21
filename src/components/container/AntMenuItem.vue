<template>
  <a-menu-item v-bind="$attrs" :key="key">
    <slot></slot>
  </a-menu-item>
</template>

<script>
import { defineComponent } from "vue";
import { MenuItem as AntMenuItem } from "ant-design-vue";

export default defineComponent({
  name: "MenuItem",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntMenuItem,
  },
  props: {
    // eslint-disable-next-line vue/no-unused-components, vue/no-reserved-props
    key: {
      type: String,
      required: true,
    },
  },
});
</script>
