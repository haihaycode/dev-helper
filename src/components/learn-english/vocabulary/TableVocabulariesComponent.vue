<template>
  <div id="TableVocabularies">
    <table
      class="min-w-full table-auto border-collapse rounded-xl overflow-hidden shadow-sm bg-white"
    >
      <thead class="bg-blue-900 bg-opacity-80 text-white">
        <tr>
          <th class="px-4 py-2 text-left font-bold">WORD</th>
          <th class="px-4 py-2 text-left font-bold">TRANSLATE</th>
          <th class="px-4 py-2 text-left font-bold"></th>
        </tr>
      </thead>
      <tbody
        v-if="!isSelectPractice"
        id="TABLE-BASIC"
        class="table-body-vocabulary"
      >
        <tr
          v-for="(record, index) in vocabularyList"
          :key="record.id || index"
          @click="handleRowClick(record)"
          class="cursor-pointer bg-opacity-50 transition-all duration-300 hover:bg-gray-300"
          :class="[
            selectedVocabulary?.id == record.id ? 'bg-gray-300' : null,
            index % 2 === 0 ? 'bg-gray-100' : 'bg-white',
          ]"
        >
          <td class="px-4 py-2 text-left flex english">
            <p class="font-semibold text-blue-900 mr-2">
              {{ record.english?.toLocaleUpperCase() }}
            </p>
            <p
              id="MARK_STAR"
              @click.stop
              @click="record.id !== undefined && handleChangeSpecial(record)"
            >
              <StarFilled
                v-show="record.is_special"
                class="text-yellow-300 text-xl flex items-center hover:text-yellow-200"
              />
              <StarOutlined
                v-show="!record.is_special"
                class="text-gray-300 text-xl flex items-center hover:text-gray-900"
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
                  <Menu.Item key="edit" @click="handleEdit(record)">{{
                    i18n.global.t("btn.edit")
                  }}</Menu.Item>
                  <Menu.Item key="delete">
                    <a-popconfirm
                      :cancelText="i18n.global.t('btn.cancel')"
                      :okText="i18n.global.t('btn.confirm')"
                      @confirm="handleDelete(record)"
                    >
                      <template #icon>
                        <question-circle-outlined style="color: red" />
                      </template>
                      <p class="w-full">{{ i18n.global.t("btn.delete") }}</p>
                    </a-popconfirm>
                  </Menu.Item>
                </Menu>
              </template>
            </Dropdown>
          </td>
        </tr>
        <tr v-if="!vocabularyList || getLoadingGet()" :aria-colspan="3">
          <td :colspan="3" class="px-4 py-2 text-center text-gray-500">
            {{ i18n.global.t("loading.default") }}
          </td>
        </tr>
      </tbody>

      <tbody v-else id="TABLE-PRACTICE" class="table-body-vocabulary">
        <tr
          v-for="(record, index) in vocabularyList"
          :key="record.id || index"
          class="cursor-pointer bg-opacity-50 transition-all duration-300"
          :class="[isInLocalStorage(record.id!) ? 'bg-blue-600 bg-opacity-20' : null]"
          @click.stop="toggleVocabularyInStorage(record)"
        >
          <td class="px-4 py-2 text-left flex english">
            <p class="font-semibold text-blue-900 mr-2">
              {{ record.english?.toLocaleUpperCase() }}
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
                  <Menu.Item key="edit" @click="handleEdit(record)">{{
                    i18n.global.t("btn.edit")
                  }}</Menu.Item>
                  <Menu.Item key="delete">
                    <a-popconfirm
                      :cancelText="i18n.global.t('btn.cancel')"
                      :okText="i18n.global.t('btn.confirm')"
                      @confirm="handleDelete(record)"
                    >
                      <template #icon>
                        <question-circle-outlined style="color: red" />
                      </template>
                      <p class="w-full">{{ i18n.global.t("btn.delete") }}</p>
                    </a-popconfirm>
                  </Menu.Item>
                </Menu>
              </template>
            </Dropdown>
          </td>
        </tr>
        <tr v-if="!vocabularyList || getLoadingGet()" :aria-colspan="3">
          <td :colspan="3" class="px-4 py-2 text-center text-gray-500">
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
      :vocabulary="selectedVocabulary !== null ? selectedVocabulary : {} as IVocabulary"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType, onMounted } from "vue";
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
  isSelectPractice: {
    type: Boolean,
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

const storedVocabularyIds = ref<number[]>([]);

const loadStoredVocabularies = () => {
  try {
    const raw = localStorage.getItem("selected_vocabularies");
    const stored: IVocabulary[] = raw ? JSON.parse(raw) : [];
    storedVocabularyIds.value = stored
      .map((v) => v.id)
      .filter(Boolean) as number[];
  } catch (e) {
    console.error("Lỗi đọc localStorage:", e);
    storedVocabularyIds.value = [];
  }
};

// Gọi lúc mounted
loadStoredVocabularies();

const toggleVocabularyInStorage = (record: IVocabulary) => {
  const storageKey = "selected_vocabularies";
  let stored: IVocabulary[] = [];

  try {
    const raw = localStorage.getItem(storageKey);
    stored = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Lỗi đọc localStorage:", e);
  }

  const exists = stored.some((v) => v.id === record.id);

  if (exists) {
    stored = stored.filter((v) => v.id !== record.id);
  } else {
    stored.push(record);
  }

  localStorage.setItem(storageKey, JSON.stringify(stored));
  loadStoredVocabularies(); // cập nhật danh sách sau khi lưu
};

const isInLocalStorage = (id: number) => {
  return storedVocabularyIds.value.includes(id);
};

onMounted(() => {
  loadStoredVocabularies();
});
</script>

<style></style>
