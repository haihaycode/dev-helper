<template>
  <div id="TableVocabularies">
    <table class="min-w-full table-auto border-collapse bg-slate-100">
      <thead class="bg-blue-900 text-white">
        <tr>
          <th class="px-4 py-2 text-left font-bold">WORD</th>
          <th class="px-4 py-2 text-left font-bold">TRANSLATE</th>
          <th class="px-4 py-2 text-left font-bold"></th>
        </tr>
      </thead>
      <tbody class="table-body-vocabulary">
        <tr
          v-for="(record, index) in vocabularyList"
          :key="index"
          @click="handleRowClick(record)"
          :class="[
            selectedVocabulary?.id == record.id ? 'bg-blue-200' : null,
            index % 2 === 0 ? 'bg-gray-100' : 'bg-white',
          ]"
          class="cursor-pointer bg-opacity-50 transition-all duration-300 hover:bg-blue-100"
        >
          <td class="px-4 py-2 text-left flex english">
            <p class="font-semibold text-blue-900 mr-2">
              {{ record.english?.toLocaleUpperCase() }}
            </p>
            <p
              @click.stop
              @click="record.id !== undefined && handleChangeSpecial(record)"
            >
              <StarFilled
                v-show="record.is_special"
                class="text-yellow-300 text-xl flex items-center transition-colors duration-500 hover:text-yellow-200 transform"
              />
              <StarOutlined
                v-show="!record.is_special"
                class="text-gray-300 text-xl flex items-center transition-colors duration-500 hover:text-gray-900 transform"
              />
            </p>
          </td>
          <td class="px-4 py-2 text-left translate">
            {{ record.translate?.toLocaleUpperCase() }}
          </td>
          <td class="px-2 py-2">
            <Dropdown trigger="click" @click.stop>
              <a class="flex items-center justify-end text-2xl text-blue-900">
                <EllipsisOutlined />
              </a>
              <template #overlay>
                <Menu>
                  <Menu.Item
                    key="edit"
                    @click="handleEdit(record)"
                    class="flex"
                  >
                    {{ i18n.global.t("btn.edit") }}
                  </Menu.Item>
                  <Menu.Item key="delete">
                    <a-popconfirm
                      :cancelText="i18n.global.t('btn.cancel')"
                      :okText="i18n.global.t('btn.confirm')"
                      @confirm="handleDelete(record)"
                    >
                      <template #icon>
                        <question-circle-outlined style="color: red" />
                      </template>
                      <p class="w-full">
                        {{ i18n.global.t("btn.delete") }}
                      </p>
                    </a-popconfirm>
                  </Menu.Item>
                </Menu>
              </template>
            </Dropdown>
          </td>
        </tr>
        <tr v-if="!vocabularyList || getLoadingGet()" :aria-colspan="3">
          <td colspan="3" class="px-4 py-2 text-center text-gray-500">
            {{ i18n.global.t("loading.default") }}
          </td>
        </tr>
      </tbody>
    </table>

    <PaginationComponent
      :pageInfo="pageInfo"
      @pageChange="handlePageChange"
      @pageSizeChange="handlePageSizeChange"
    />

    <DrawerVocaDetail
      v-if="drawerVisible"
      @close="drawerVisible = false"
      @edit="handleEdit"
      :drawerVisible="drawerVisible"
      :vocabulary="selectedVocabulary"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType } from "vue";
import { IVocabulary } from "@/models/IIearnEnglish";
import "ant-design-vue/dist/antd.css";
import { IPageInfo } from "@/models/base";
import { defineEmits } from "vue";
import PaginationComponent from "@/components/navigation/PaginationComponent.vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";

import {
  StarOutlined,
  StarFilled,
  EllipsisOutlined,
} from "@ant-design/icons-vue";
import { getLoadingGet } from "@/utils/loadingUtils";
import i18n from "@/services/i18n";
import { Dropdown, Menu } from "ant-design-vue";
import DrawerVocaDetail from "./DrawerVocaDetail.vue";

defineProps({
  vocabularyList: {
    type: Array as () => Array<IVocabulary>,
    required: false,
  },
  pageInfo: {
    type: Object as PropType<IPageInfo<IVocabulary> | undefined>,
    required: false,
  },
});

const emit = defineEmits([
  "pageChange",
  "pageSizeChange",
  "changeSpecial",
  "delete",
  "edit",
]);

const selectedVocabulary = ref<IVocabulary | null>(null);
const handlePageChange = (page: number) => {
  emit("pageChange", page);
};
const handlePageSizeChange = (current: number, pageSize: number) => {
  emit("pageSizeChange", { current, pageSize });
};
const handleChangeSpecial = (o: IVocabulary) => {
  emit("changeSpecial", o);
};
const handleDelete = (o: IVocabulary) => {
  emit("delete", o);
};
const handleEdit = (o: IVocabulary) => {
  emit("edit", o);
};

const drawerVisible = ref(false);
const handleRowClick = (record: IVocabulary) => {
  selectedVocabulary.value = record;
  drawerVisible.value = true;
};
</script>

<style></style>
