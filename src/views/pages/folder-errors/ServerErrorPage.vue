<template>
  <div class="error-page">
    <AntTwoColumnCard
      :gutter="24"
      :leftSpanXs="24"
      :leftSpanSm="24"
      :leftSpanMd="12"
      :leftSpanLg="12"
      :leftSpanXl="12"
      :rightSpanXs="24"
      :rightSpanSm="24"
      :rightSpanMd="12"
      :rightSpanLg="12"
      :rightSpanXl="12"
    >
      <template #left>
        <AntImage
          src="https://cdn.dribbble.com/users/114645/screenshots/3116766/500-cb.gif"
          alt="Error Image"
          width="100%"
          height="auto"
          preview
        />
      </template>
      <template #right>
        <AntCard class="error-card" :title="t('ERROR_PAGE.SERVER_ERROR.TITLE')">
          <p>{{ t("ERROR_PAGE.SERVER_ERROR.MESSAGE") }}</p>
          <AntButton @click="goBack" type="primary">{{
            t("ERROR_PAGE.SERVER_ERROR.BUTTON")
          }}</AntButton>
        </AntCard>
      </template>
    </AntTwoColumnCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";
import { dynamicImport } from "@/utils/importUtils";

const components = dynamicImport([
  "components/container/AntCard",
  "components/container/AntButton",
  "components/container/AntImage",
  "components/container/AntTwoColumnCard",
]);

export default defineComponent({
  name: "ServerErrorPage",
  components: {
    AntCard: defineAsyncComponent(components["components/container/AntCard"]),
    AntButton: defineAsyncComponent(
      components["components/container/AntButton"]
    ),
    AntImage: defineAsyncComponent(components["components/container/AntImage"]),
    AntTwoColumnCard: defineAsyncComponent(
      components["components/container/AntTwoColumnCard"]
    ),
  },
  setup() {
    const { t } = useI18n();
    const goBack = () => {
      window.history.back();
    };
    return { t, goBack };
  },
});
</script>

<style scoped lang="stylus">
.error-page
  display flex
  justify-content center
  align-items center
  height 100vh
  max-width 1200px
  margin 0px auto

.error-card
  width 100%
  border none
  box-shadow none
  text-align center
</style>
