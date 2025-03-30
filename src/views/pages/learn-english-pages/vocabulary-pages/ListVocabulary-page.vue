<template>
  <LearnEnglishPagePatternLayout :title="$t('nav.l.english.listVocabulary')">
    <template #content>
      <div id="listVocabulary">
        <div class="flex justify-between navigation mb-2">
          <SearchFilter @search="handleSearch" />
          <button
            v-t="'nav.l.english.btn.addVocabulary'"
            class="px-2 py-2 bg-blue-900 hover:bg-blue-400 rounded-sm text-white"
            @click="showModalVoabularyAdd = true"
          ></button>
        </div>
        <div id="content ">
          <TableVocabulariesComponent
            :page-info="vocabulariesResponse?.data"
            :vocabularyList="vocabulariesResponse?.data?.results"
            @change-special="handleChangeSpecical"
            @page-change="handlePageChange"
            @page-size-change="handlePageSizeChange"
          />
        </div>
      </div>

      <ModalVocabularyAdd
        v-if="showModalVoabularyAdd"
        :modelValue="showModalVoabularyAdd"
        @update:modelValue="
          ($event) => {
            showModalVoabularyAdd = $event;
            loadedPages = {};
            handleFetchVocabulary();
          }
        "
        @closenoload="showModalVoabularyAdd = false"
        @close="showModalVoabularyAdd = false"
      />
    </template>
  </LearnEnglishPagePatternLayout>
</template>
<script setup lang="ts">
import LearnEnglishPagePatternLayout from "../LearnEnglishPagePatternLayout.vue";
import ModalVocabularyAdd from "@/components/learn-english/vocabulary/ModalVocabularyAdd.vue";
import TableVocabulariesComponent from "@/components/learn-english/vocabulary/TableVocabulariesComponent.vue";
import SearchFilter from "@/components/learn-english/vocabulary/SearchFilter.vue";
import { ref, onMounted, watchEffect } from "vue";

import {
  IVocabularyRequest,
  IVocabulariesResponse,
  IVocabulary,
} from "@/models/IIearnEnglish";
import { changeSpecial, getAllVocabularies } from "@/api/vocabulary";
import {
  IS_DELETED,
  ORDER_BY,
  PAGE_FIRST,
  PAGE_SIZE_DEFALT,
  QUERY_DEFAUlT,
} from "@/utils/global";

// States
const showModalVoabularyAdd = ref(false); // modal add vocabulary
const vocabulariesResponse = ref<IVocabulariesResponse>();
const vocabularyRequest = ref<IVocabularyRequest>({
  query: QUERY_DEFAUlT,
  page: PAGE_FIRST,
  pageSize: PAGE_SIZE_DEFALT + 10,
  is_deleted: IS_DELETED.is_False,
  orderBy: {
    column: ORDER_BY.COLUMN_DEFAULT,
    order: ORDER_BY.ORDER_DEFAULT,
  },
});
const loadedPages = ref<{ [key: number]: IVocabulariesResponse }>({});

const handleSearch = (value: string) => {
  vocabularyRequest.value.query = value;
  vocabularyRequest.value.page = 1;
  loadedPages.value = {};
  handleFetchVocabulary();
};

const handlePageChange = (page: number) => {
  vocabularyRequest.value.page = page;
  handleFetchVocabulary();
};

const handlePageSizeChange = ({
  current,
}: {
  current: { current: number; pageSize: number };
}) => {
  vocabularyRequest.value.page = current.current;
  vocabularyRequest.value.pageSize = current.pageSize;
  loadedPages.value = {};
  handleFetchVocabulary();
};

const handleChangeSpecical = async (o: IVocabulary) => {
  const currentPage = vocabularyRequest.value.page;
  if (currentPage !== undefined && loadedPages.value[currentPage]) {
    const currentPageData = loadedPages.value[currentPage].data?.results;
    currentPageData?.forEach(async (item, index) => {
      if (item.id === o.id) {
        currentPageData[index] = {
          ...item,
          is_special: !item.is_special,
        };
        try {
          if (item.id !== undefined) {
            await changeSpecial(item.id);
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
};

const handleFetchVocabulary = async () => {
  const currentPage = vocabularyRequest.value.page;
  if (currentPage !== undefined && loadedPages.value[currentPage]) {
    vocabulariesResponse.value = loadedPages.value[currentPage];
    return;
  }
  try {
    const response = await getAllVocabularies(vocabularyRequest.value);
    vocabulariesResponse.value = response;
    if (currentPage !== undefined) {
      loadedPages.value[currentPage] = response;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleFetchVocabulary();
});

watchEffect(() => {
  handleFetchVocabulary();
});
</script>
