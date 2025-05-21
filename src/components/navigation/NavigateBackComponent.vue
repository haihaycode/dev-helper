<template>
  <div
    @click="goBack"
    id="navigationBack"
    class="text-blue-900 font-bold text-left flex items-center cursor-pointer space-x-1"
  >
    <ArrowLeftOutlined /> <span>{{ $t("GLOBAL.GO_BACK") }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { defineProps } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
