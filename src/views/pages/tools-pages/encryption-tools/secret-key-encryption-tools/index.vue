<template>
  <div class="main min-h-[100vh] sm:p-2 md:p-4 lg:p-6 xl:p-8">
    <Breadcrumb :items="breadcrumbItems" />
    <a-transition name="fade" mode="out-in">
      <div class="content mt-2 px-2" v-if="tool">
        <a-typography-title :level="3" class="text-center md:text-left">
          {{ $t(tool.name) }}
        </a-typography-title>
        <a-typography-paragraph
          class="hidden sm:block"
          style="text-align: left"
        >
          {{ $t(tool.description) }}
        </a-typography-paragraph>
        <a-typography-paragraph
          class="sm:hidden block"
          style="text-align: left"
        >
          {{ truncateString($t(tool.description), 200) }}
        </a-typography-paragraph>
      </div>
    </a-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Breadcrumb from "@/components/container/Breadcrumb.vue";
import { HomeOutlined } from "@ant-design/icons-vue";
import { getToolTypeById, getToolById } from "@/services/tools/toolsService";
import { useI18n } from "vue-i18n";
import { truncateString } from "@/utils/StringUtils";

export default defineComponent({
  name: "SecretKeyEncryptionToolsPage",
  components: {
    Breadcrumb,
  },
  setup() {
    const { t } = useI18n();
    const toolId = "1"; // Replace with actual tool ID
    const tool = getToolById(toolId);
    const toolTypeId = tool?.idtoolsType || "";
    const toolType = getToolTypeById(toolTypeId);

    const breadcrumbItems = computed(() => [
      { href: "/", icon: HomeOutlined },
      { href: `/tools/${toolType?.idtoolsType}`, text: toolType?.name },
      { text: tool?.name },
    ]);

    return {
      t,
      tool,
      breadcrumbItems,
      truncateString,
    };
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
