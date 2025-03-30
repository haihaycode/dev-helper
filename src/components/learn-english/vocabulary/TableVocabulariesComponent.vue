<template>
  <div id="TableVocabularies">
    <table class="min-w-full table-auto border-collapse bg-slate-100">
      <thead class="bg-blue-900 text-white">
        <tr>
          <th class="px-4 py-2 text-left font-bold">ENGLISH</th>
          <th class="px-4 py-2 text-left font-bold">TRANSLATE</th>
          <th class="px-4 py-2 text-left font-bold"></th>
        </tr>
      </thead>
      <tbody class="table-body-vocabulary">
        <tr
          v-for="(record, index) in vocabularyList"
          :key="index"
          @click="handleRowClick(record)"
          class="cursor-pointer hover:bg-gray-200"
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
                  <Menu.Item key="edit" @click="undefined" class="flex">
                    {{ i18n.global.t("Edit") }}
                  </Menu.Item>
                  <Menu.Item key="delete" @click="undefined">
                    {{ i18n.global.t("Delete") }}
                  </Menu.Item>
                </Menu>
              </template>
            </Dropdown>
          </td>
        </tr>
        <tr v-if="!vocabularyList || getLoadingGet()" :aria-colspan="2">
          <td colspan="2" class="px-4 py-2 text-center text-gray-500">
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

    <a-drawer
      title="Vocabulary Details"
      :visible="drawerVisible"
      @close="drawerVisible = false"
      :width="isSmallScreen ? '100%' : 400"
      :placement="isSmallScreen ? 'bottom' : 'right'"
      :height="isSmallScreen ? '50vh' : undefined"
    >
      <div>
        <p><strong>English:</strong> {{ selectedVocabulary?.english }}</p>
        <p><strong>Translate:</strong> {{ selectedVocabulary?.translate }}</p>
        <p>
          <strong>Example Sentence:</strong>
          {{ selectedVocabulary?.example_sentence }}
        </p>
        <div v-if="selectedVocabulary?.image">
          <strong>Image:</strong>
          <img
            :src="selectedVocabulary.image"
            alt="Vocabulary Image"
            class="mt-2 rounded-md"
          />
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted, onUnmounted, PropType } from "vue";
import { IVocabulary } from "@/models/IIearnEnglish";
import "ant-design-vue/dist/antd.css";
import { IPageInfo } from "@/models/base";
import { defineEmits } from "vue";
import PaginationComponent from "@/components/navigation/PaginationComponent.vue";
import {
  StarOutlined,
  StarFilled,
  MoreOutlined,
  EllipsisOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import { getLoadingGet } from "@/utils/loadingUtils";
import i18n from "@/services/i18n";
import { Dropdown, Menu } from "ant-design-vue";
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

const emit = defineEmits(["pageChange", "pageSizeChange", "changeSpecial"]);

const handlePageChange = (page: number) => {
  emit("pageChange", page);
};
const handlePageSizeChange = (current: number, pageSize: number) => {
  emit("pageSizeChange", { current, pageSize });
};
const handleChangeSpecial = (o: IVocabulary) => {
  emit("changeSpecial", o);
};

const isSmallScreen = ref(false);
const drawerVisible = ref(false);
const selectedVocabulary = ref<IVocabulary | null>(null);
const handleRowClick = (record: IVocabulary) => {
  selectedVocabulary.value = record;
  drawerVisible.value = true;
};
const handleResize = () => {
  isSmallScreen.value = window.innerWidth <= 640;
};
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style>
.table-body-vocabulary > tr:nth-child(odd) {
  background-color: #d7d7d700; /* Màu nền nhạt */
}
.table-body-vocabulary > tr:nth-child(even) {
  background-color: #e5e7eb98; /* Màu nền đậm hơn */
}
</style>
