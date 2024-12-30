<template>
  <div class="base-page">
    <a-row gutter="[16,16]" justify="start">
      <a-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="8"
        :xl="6"
        v-for="tool in tools"
        :key="tool.idtools"
      >
        <a-card hoverable style="width: auto">
          <template #cover>
            <img
              height="150px"
              :src="require('@/assets/tools/bg/' + tool.idtools + '.png')"
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
                :src="require('@/assets/tools/img/' + tool.idtools + '.png')"
              />
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import toolsData from "@/data/tools/tools.json"; // Import your JSON file
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons-vue";
import { truncateString } from "@/utils/StringUtils";

interface Tool {
  name: string;
  idtools: string;
  image: string;
  description: string;
}

export default defineComponent({
  name: "indexToolsPage",
  components: {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
  },
  setup() {
    const { t } = useI18n();
    const tools = ref<Tool[]>(toolsData);

    return {
      truncateString,
      t,
      tools,
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
