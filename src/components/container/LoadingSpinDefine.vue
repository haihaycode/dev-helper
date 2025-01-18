<template>
  <div class="flex items-center justify-center h-screen">
    <a-spin class="text-yellow-500" size="large" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Spin } from "ant-design-vue";

export default defineComponent({
  name: "LoadingSpinDefine",
  components: {
    "a-spin": Spin,
  },
});
</script>

<style scoped>
/* Bạn có thể thêm các kiểu tùy chỉnh ở đây nếu cần */
</style>
