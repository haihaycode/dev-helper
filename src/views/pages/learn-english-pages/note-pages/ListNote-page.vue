<template>
  <LearnEnglishPagePatternLayout :title="i18n.global.t('NOTE_SECTION.TITLE')">
    <template #content>
      <div id="NOTEPAGE">
        <div id="ACTION" class="flex justify-between navigation mb-2"></div>
        <div id="CONTENT">
          <GridNotesComponent
            :notes="notesRes?.data?.results"
            :loading="loading"
          />
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
import { onMounted, ref, onBeforeUnmount } from "vue";
import { getAll } from "@/api/noteApi";
import GridNotesComponent from "@/components/learn-english/notes/GridNotesComponent.vue";

const loading = ref(false);
const notesRes = ref<INotesResponse>({
  data: {
    results: [],
    page: 1,
    pageSize: PAGE_SIZE_DEFAULT,
    totalCount: 0,
    totalPages: 0,
  },
});
const noteReq = ref<INoteRequest>({
  query: QUERY_DEFAULT,
  page: PAGE_FIRST,
  pageSize:
    window.innerWidth <= 640 ? PAGE_SIZE_DEFAULT - 2 : PAGE_SIZE_DEFAULT + 2,
  is_deleted: IS_DELETED.is_False,
  orderBy: {
    column: ORDER_BY.COLUMN_DEFAULT,
    order: ORDER_BY.ORDER_DEFAULT,
  },
});

const handleFetchNotes = async () => {
  loading.value = true;
  try {
    const response = await getAll(noteReq.value);
    if (noteReq.value.page === 1) {
      notesRes.value = response;
    } else if (response.data?.results && notesRes.value?.data?.results) {
      notesRes.value.data.results.push(...response.data.results);
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handleScroll = () => {
  if (
    loading.value ||
    (noteReq.value.page !== undefined &&
      notesRes.value.data &&
      noteReq.value.page >= notesRes.value.data.totalPages)
  )
    return;
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollHeight - scrollTop <= clientHeight + 5) {
    if (noteReq.value.page !== undefined) {
      noteReq.value.page++;
    }
    handleFetchNotes();
  }
};

onMounted(() => {
  handleFetchNotes();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
