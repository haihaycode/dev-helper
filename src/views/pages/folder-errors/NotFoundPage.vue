<template>
  <div class="bg-opacity-0 rubberBand">
    <a-result status="404" title="404" :sub-title="t('error.404.message')">
      <template #extra>
        <a-button type="primary" @click="goBack">{{
          t("error.404.button")
        }}</a-button>
        <a-button type="primary" style="margin-left: 8px" @click="goHome"
          >Trang chủ</a-button
        >
      </template>
    </a-result>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { getPreviousRoute } from "@/utils/routeUtils";
export default defineComponent({
  name: "NotFoundPage",
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const goBack = () => {
      router.push(getPreviousRoute());
    };
    const goHome = () => {
      router.push("/");
    };
    return { t, goBack, goHome };
  },
});
</script>

<style scoped lang="stylus"></style>
