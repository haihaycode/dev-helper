<template>
  <div class="base-page">
    <H1>TOOL page</H1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";
import * as yup from "yup";
import { dynamicImport } from "@/utils/importUtils";

const components = dynamicImport([
  "components/container/AntCard",
  "components/container/AntInput",
  "components/container/AntButton",
  "components/container/AntModalMessage",
  "components/container/AntFormGroup",
  "components/container/AntForm",
  "components/container/AntTwoColumnCard",
  "components/container/RouterLink",
  "components/container/AntImage",
  "components/container/AntRow",
  "components/container/AntCol",
  "components/container/AntText",
]);

export default defineComponent({
  name: "indexToolsPage",
  components: {
    // AntCard: defineAsyncComponent(components["components/container/AntCard"]),
    // AntInput: defineAsyncComponent(components["components/container/AntInput"]),
    // AntButton: defineAsyncComponent(
    //   components["components/container/AntButton"]
    // ),
    // AntModalMessage: defineAsyncComponent(
    //   components["components/container/AntModalMessage"]
    // ),
    // AntFormGroup: defineAsyncComponent(
    //   components["components/container/AntFormGroup"]
    // ),
    // AntForm: defineAsyncComponent(components["components/container/AntForm"]),
    // AntTwoColumnCard: defineAsyncComponent(
    //   components["components/container/AntTwoColumnCard"]
    // ),
    // RouterLink: defineAsyncComponent(
    //   components["components/container/RouterLink"]
    // ),
    // AntImage: defineAsyncComponent(components["components/container/AntImage"]),
    // AntRow: defineAsyncComponent(components["components/container/AntRow"]),
    // AntCol: defineAsyncComponent(components["components/container/AntCol"]),
    // AntText: defineAsyncComponent(components["components/container/AntText"]),
  },
  setup() {
    const { t } = useI18n();

    return {
      t,
    };
  },
});
</script>

<style scoped lang="stylus">
.base-page
  display flex
  justify-content center
  align-items center
  height 100vh
  max-width 1200px
  margin 20px auto
</style>
