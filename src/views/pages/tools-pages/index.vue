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
            <setting-outlined key="setting" />
            <edit-outlined key="edit" />
            <ellipsis-outlined key="ellipsis" />
          </template>
          <a-card-meta
            :title="$t(tool.name)"
            :description="truncateString($t(tool.description), 50)"
          >
            <template #avatar>
              <a-avatar
                :src="
                  require('@/assets/tools/img/' + tool.idtoolsType + '.png')
                "
              />
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import toolsData from "@/data/tools/tools.json"; // Import your JSON file
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons-vue";
import { truncateString } from "@/utils/StringUtils";
import { useStore } from "vuex";

interface Tool {
  name: string;
  image: string;
  description: string;
  idtoolsType: string;
}

export default defineComponent({
  name: "indexToolsPage",
  components: {
    SettingOutlined,
    EditOutlined,
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
