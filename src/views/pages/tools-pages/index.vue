<template>
  <div class="base-page">
    <a-row gutter="[16,16]" justify="start">
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
        :key="tool.idtoolsType"
      >
        <a-card hoverable style="width: auto">
          <template #cover>
            <img
              height="150px"
              :src="require('@/assets/tools/bg/' + tool.idtoolsType + '.png')"
            />
          </template>
          <template #actions>
            <a-row gutter="16">
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
            <a-row gutter="16">
              <a-col
                :span="12"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: right;
                "
              >
                Details</a-col
              >
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
          </template>
          <a-card-meta>
            <template #avatar>
              <a-avatar
                :src="
                  require('@/assets/tools/img/' + tool.idtoolsType + '.png')
                "
              />
            </template>
            <template #title>
              <a-typography-title style="text-align: left" :level="5">{{
                $t(tool.name)
              }}</a-typography-title>
            </template>
            <template #description>
              <a-typography-paragraph style="text-align: left">
                {{ truncateString($t(tool.description), 50) }}
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

interface Tool {
  name: string;
  image: string;
  description: string;
  idtoolsType: string;
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
    console.log(toolType.value); // string '1'
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
      tools,
      filteredTools,
    };
  },
});
</script>

<style scoped lang="stylus">
.base-page
  min-height 100vh
  padding: 20px

a-row
  margin-top: 10px

a-card
  background-color: #fff
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
  border-radius: 8px

a-card:hover
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2)
</style>
