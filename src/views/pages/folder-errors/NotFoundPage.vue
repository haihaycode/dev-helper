<template>
  <div class="bg-opacity-0 rubberBand">
    <a-result status="404" title="404" :sub-title="t('error.404.message')">
      <template #extra>
        <a-button type="primary" @click="goBack">{{
          t("error.404.button")
        }}</a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "NotFoundPage",
  setup() {
    const { t } = useI18n();
    const goBack = () => {
      window.history.back();
    };
    return { t, goBack };
  },
});
</script>

<style scoped lang="stylus"></style>
