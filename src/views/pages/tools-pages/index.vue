<template>
  <div class="min-h-[100vh] sm:p-2 md:p-4 lg:p-6 xl:p-8">
    <a-row gutter="[16,16]" justify="start" class="gap-4">
      <a-col v-if="filteredTools.length === 0" :span="24">
        <a-empty description="No data" />
      </a-col>
      <a-col
        v-else
        :xs="24"
        :sm="12"
        :md="12"
        :lg="8"
        :xl="6"
        v-for="tool in filteredTools"
        :key="tool.idtools"
      >
        <a-card hoverable style="width: auto">
          <template #cover>
            <div
              class="relative group"
              @click="
                () =>
                  $router.push({
                    name: `${tool.nameSlug}`,
                    params: { id: tool.name },
                  })
              "
            >
              <img
                :src="require('@/assets/tools/bg/' + tool.idtools + '.png')"
                class="transition-opacity duration-300 group-hover:opacity-50 w-full h-[150px]"
              />
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:bg-opacity-100"
              >
                View &nbsp;<EyeOutlined />
              </div>
            </div>
            <a-typography-paragraph
              :style="{ backgroundColor: tool.color }"
              class="flex justify-start border-none text-white items-center mb-0"
            >
              &nbsp;
              {{ $t(getToolTypeById(tool.idtoolsType)?.name || "no type") }}
            </a-typography-paragraph>
          </template>
          <template #actions>
            <a-row
              :gutter="[16, 16]"
              @click="
                () =>
                  $router.push({
                    name: `${tool.nameSlug}`,
                    params: { id: tool.name },
                  })
              "
            >
              <a-col
                :span="12"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: right;
                "
              >
                View</a-col
              >
              <a-col
                :span="12"
                style="
                  display: flex;
                  justify-content: left !important;
                  align-items: center;
                "
              >
                <EyeOutlined
              /></a-col>
            </a-row>
            <!-- / -->
            <a-popover placement="bottom" trigger="click">
              <template #title>{{ $t(tool.name) }}</template>
              <template #content>{{ $t(tool.description) }}</template>
              <a-row :gutter="[16, 16]">
                <a-col
                  :span="12"
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: right;
                  "
                >
                  Details
                </a-col>
                <a-col
                  :span="12"
                  style="
                    display: flex;
                    justify-content: left !important;
                    align-items: center;
                  "
                >
                  <ellipsis-outlined key="ellipsis" />
                </a-col>
              </a-row>
            </a-popover>
          </template>
          <a-card-meta
            @click="
              () =>
                $router.push({
                  name: `${tool.nameSlug}`,
                  params: { id: tool.name },
                })
            "
          >
            <template #avatar>
              <a-avatar
                :src="
                  require('@/assets/tools/img/' + tool.idtoolsType + '.png')
                "
              />
            </template>
            <template #title>
              <a-typography-title
                style="text-align: left"
                :level="5"
                class="hover:text-blue-500 hover:underline"
              >
                {{ $t(tool.name) }}
              </a-typography-title>
            </template>
            <template #description>
              <a-typography-paragraph style="text-align: left">
                {{ truncateString($t(tool.description), 70) }}
              </a-typography-paragraph>
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import toolsData from "@/data/tools/tools.json"; // Import your JSON file
import { EyeOutlined, EllipsisOutlined } from "@ant-design/icons-vue";
import { truncateString } from "@/utils/StringUtils";
import { useStore } from "vuex";
import { notification } from "ant-design-vue";
import { getToolTypeById } from "@/services/tools/toolsService";
interface Tool {
  name: string;
  image: string;
  description: string;
  idtools: string;
  idtoolsType: string;
  color: string;
  slug: string;
  nameSlug: string;
}

export default defineComponent({
  name: "indexToolsPage",
  components: {
    EyeOutlined,
    EllipsisOutlined,
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const tools = ref<Tool[]>(toolsData);
    const toolType = computed(() => store.getters["tool/toolType"]);
    const filteredTools = computed(() => {
      return tools.value.filter((tool) => tool.idtoolsType === toolType.value);
    });

    watch(filteredTools, (toolsNewVal) => {
      if (toolsNewVal.length === 0) {
        notification.info({
          message: `No tools found`,
          description: "Unfortunately, no tools match your criteria.",
          placement: "bottomRight",
        });
      }
    });

    return {
      truncateString,
      t,
      getToolTypeById,
      tools,
      filteredTools,
    };
  },
});
</script>

<style scoped lang="stylus">

a-row
  margin-top: 10px

a-card
  background-color: #fff
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
  border-radius: 8px

a-card:hover
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2)
</style>
