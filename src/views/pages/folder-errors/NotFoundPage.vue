<template>
  <div class="bg-opacity-0 rubberBand">
    <a-result
      status="404"
      title="404"
      :sub-title="i18n.global.t('ERROR_PAGE.NOT_FOUND.TITLE')"
    >
      <template #extra>
        <a-button type="primary" class="bg-blue-700" @click="goBack">{{
          i18n.global.t("ERROR_PAGE.NOT_FOUND.GO_BACK_BUTTON")
        }}</a-button>
        <a-button
          type="primary"
          style="margin-left: 8px"
          class="bg-blue-700"
          @click="goHome"
        >
          {{ i18n.global.t("NAVIGATION_MENU.HOME_LINK") }}
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import i18n from "@/services/i18n";
import { getPreviousRoute } from "@/utils/routeUtils";
export default defineComponent({
  name: "NotFoundPage",
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.push(getPreviousRoute());
    };
    const goHome = () => {
      router.push("/");
    };
    return { i18n, goBack, goHome };
  },
});
</script>

<style scoped lang="stylus"></style>
