<template>
  <div class="loading-overlay" v-if="visible">
    <a-spin size="large" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Spin as AntSpin } from "ant-design-vue";

export default defineComponent({
  name: "LoadingComponent",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntSpin,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
