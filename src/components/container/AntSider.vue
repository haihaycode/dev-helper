<template>
  <a-layout-sider
    v-bind="$attrs"
    :class="customClass"
    :collapsed="collapsed"
    @collapse="handleCollapse"
  >
    <slot></slot>
  </a-layout-sider>
</template>

<script>
import { defineComponent } from "vue";
import { Layout } from "ant-design-vue";

export default defineComponent({
  name: "AntSider",
  components: {
    "a-layout-sider": Layout.Sider,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleCollapse(collapsed) {
      this.$emit("update:collapsed", collapsed);
    },
  },
});
</script>
