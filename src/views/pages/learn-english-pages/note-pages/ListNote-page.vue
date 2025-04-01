<template>
  <LearnEnglishPagePatternLayout :title="i18n.global.t('note.title')">
    <template #content>
      <div id="NOTE-PAGE">
        <div id="ACTION" class="flex justify-between navigation mb-2"></div>
        <div id="CONTENT">
          <GridNotesComponent :notes="notesRes?.data?.results" />
        </div>
      </div>
    </template>
  </LearnEnglishPagePatternLayout>
</template>
<script lang="ts" setup>
import i18n from "@/services/i18n";
import LearnEnglishPagePatternLayout from "../LearnEnglishPagePatternLayout.vue";
import { INoteRequest, INotesResponse } from "@/models/INote";
import {
  IS_DELETED,
  ORDER_BY,
  PAGE_FIRST,
  PAGE_SIZE_DEFAULT,
  QUERY_DEFAULT,
} from "@/utils/global";
import { onMounted, ref, watchEffect } from "vue";
import { getAll } from "@/api/noteApi";
import GridNotesComponent from "@/components/learn-english/notes/GridNotesComponent.vue";

const notesRes = ref<INotesResponse>();
const noteReq = ref<INoteRequest>({
  query: QUERY_DEFAULT,
  page: PAGE_FIRST,
  pageSize: PAGE_SIZE_DEFAULT + 10,
  is_deleted: IS_DELETED.is_False,
  orderBy: {
    column: ORDER_BY.COLUMN_DEFAULT,
    order: ORDER_BY.ORDER_DEFAULT,
  },
});
const loadedPages = ref<{ [key: number]: INotesResponse }>({});
const handleSearchByQueryKeyword = (value: string) => {
  noteReq.value.query = value;
  noteReq.value.page = 1;
  loadedPages.value = {};
};
const handlePageChange = (page: number) => {
  noteReq.value.page = page;
  handleFetchNotes();
};

const handlePageSizeChange = ({
  current,
}: {
  current: { current: number; pageSize: number };
}) => {
  noteReq.value.page = current.current;
  noteReq.value.pageSize = current.pageSize;
  loadedPages.value = {};
  handleFetchNotes();
};

const handleFetchNotes = async () => {
  const currentPage = noteReq.value.page;
  if (currentPage !== undefined && loadedPages.value[currentPage]) {
    notesRes.value = loadedPages.value[currentPage];
    return;
  }
  try {
    const response = await getAll(noteReq.value);
    notesRes.value = response;
    if (currentPage !== undefined) {
      loadedPages.value[currentPage] = response;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleFetchNotes();
});

watchEffect(() => {
  handleFetchNotes();
});
</script>
