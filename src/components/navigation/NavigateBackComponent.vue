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
import { defineProps } from "vue";

const props = defineProps<{
  backTo?: string;
}>();

const router = useRouter();

function goBack() {
  if (props.backTo) {
    router.push(props.backTo);
  } else {
    router.back();
  }
}
</script>
