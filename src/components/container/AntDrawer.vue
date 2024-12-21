<template>
  <a-drawer
    v-bind="$attrs"
    :class="customClass"
    :visible="visible"
    @close="closeDrawer"
  >
    <slot></slot>
  </a-drawer>
</template>

<script>
import { defineComponent } from "vue";
import { Drawer as AntDrawer } from "ant-design-vue";

export default defineComponent({
  name: "AntDrawer",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntDrawer,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: "",
    },
  },
  methods: {
    closeDrawer() {
      this.$emit("update:visible", false);
    },
  },
});
</script>

<style scoped>
/* Style tùy chỉnh cho Drawer (nếu cần) */
</style>
