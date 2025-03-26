<template>
  <div id="TableVocabularies">
    <a-table
      :dataSource="vocabularyList"
      :columns="columns"
      rowKey="english"
      @rowClick="handleRowClick"
    ></a-table>
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
import { ref, defineProps, onMounted, onUnmounted } from "vue";
import "ant-design-vue/dist/antd.css";
const isSmallScreen = ref(false);

defineProps({
  vocabularyList: {
    type: Array as () => {
      english: string;
      translate: string;
      image?: string;
      example_sentence?: string;
    }[],
    required: false,
  },
});
const columns = [
  {
    title: "English",
    dataIndex: "english",
    key: "english",
  },
  {
    title: "Translate",
    dataIndex: "translate",
    key: "translate",
  },
];

const drawerVisible = ref(false);
const selectedVocabulary = ref<{
  english: string;
  translate: string;
  image?: string;
  example_sentence?: string;
} | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRowClick = (record: any) => {
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
