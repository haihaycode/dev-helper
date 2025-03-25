<template>
  <div
    @click="goBack"
    id="navigationBack"
    class="text-blue-900 font-bold text-left flex items-center cursor-pointer space-x-1"
  >
    <ArrowLeftOutlined /> <span>Quay lại</span>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
function goBack() {
  router.back(); // Go to the previous route
}
</script>
