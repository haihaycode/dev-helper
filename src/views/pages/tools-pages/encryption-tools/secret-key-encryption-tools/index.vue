<template>
  <div class="main min-h-[100vh] sm:p-2 md:p-4 lg:p-6 xl:p-8">
    <Breadcrumb :items="breadcrumbItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Breadcrumb from "@/components/container/Breadcrumb.vue";
import { HomeOutlined } from "@ant-design/icons-vue";
import { getToolTypeById, getToolById } from "@/services/tools/toolsService";

export default defineComponent({
  name: "SecretKeyEncryptionToolsPage",
  components: {
    Breadcrumb,
  },
  setup() {
    const toolId = "1";
    const toolTypeId = "1";

    const toolType = getToolTypeById(toolTypeId);
    const tool = getToolById(toolId);

    const breadcrumbItems = computed(() => [
      { href: "/", icon: HomeOutlined },
      { href: `/tools/${toolType?.idtoolsType}`, text: toolType?.name },
      { text: tool?.name },
    ]);

    return {
      breadcrumbItems,
    };
  },
});
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
