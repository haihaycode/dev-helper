<template>
  <div id="TableVocabularies">
    <a-table
      :dataSource="vocabularyList"
      :columns="columns"
      rowKey="english"
      @rowClick="handleRowClick"
      :locale="{ emptyText: 'No vocabularies available' }"
      :pagination="false"
    ></a-table>
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

const emit = defineEmits(["pageChange", "pageSizeChange"]);
const handlePageChange = (page: number) => {
  emit("pageChange", page);
};
const handlePageSizeChange = (current: number, pageSize: number) => {
  emit("pageSizeChange", { current, pageSize });
};

const isSmallScreen = ref(false);
const columns = [
  {
    title: "English",
    dataIndex: "english",
    key: "english",
    class: "px-2 rounded-sm text-black-900 font-bold",
  },
  {
    title: "Translate",
    dataIndex: "translate",
    key: "translate",
    class: "px-2 rounded-sm text-blue-900 font-bold",
  },
];

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
.ant-table-tbody > tr:nth-child(odd) {
  background-color: #ecf4fd00; /* Màu nền nhạt */
}
.ant-table-tbody > tr:nth-child(even) {
  background-color: #e5e7eb98; /* Màu nền đậm hơn */
}
</style>
