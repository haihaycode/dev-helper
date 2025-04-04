<template>
  <LearnEnglishPagePatternLayout :title="i18n.global.t('vocabulary.list')">
    <template #content>
      <div id="LIST-VOCA">
        <div id="ACTION" class="flex justify-between navigation mb-2">
          <SearchFilter @search="handleSearch" />
          <button
            class="px-2 py-2 flex bg-blue-900 hover:bg-blue-400 rounded-sm text-white"
            @click="showModalVoabularyAdd = true"
          >
            <PlusOutlined class="flex items-center" />
          </button>
        </div>
        <div id="CONTENT ">
          <TableVocabulariesComponent
            :page-info="vocabulariesResponse?.data"
            :vocabularyList="vocabulariesResponse?.data?.results"
            @change-special="handleChangeSpecical"
            @page-change="handlePageChange"
            @page-size-change="handlePageSizeChange"
            @delete="handleDelete"
            @edit="
              (o) => {
                vocaEdit = o;
              }
            "
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
      <ModalVocabularyEdit
        v-if="vocaEdit ? true : false"
        :model-value="vocaEdit ? true : false"
        :vocabulary-to-edit="vocaEdit"
        @update:model-value="
          (o) => {
            vocaEdit = o.o;

            if (o.loading && vocaEdit) {
              handleUpdate(vocaEdit);
              loadedPages = {};
              handleFetchVocabulary();
            }
          }
        "
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
import {
  changeSpecial,
  deleteVoca,
  getAllVocabularies,
  updateVocabulary,
} from "@/api/vocabularyApi";
import {
  IS_DELETED,
  ORDER_BY,
  PAGE_FIRST,
  PAGE_SIZE_DEFAULT,
  QUERY_DEFAULT,
} from "@/utils/global";
import ModalVocabularyEdit from "@/components/learn-english/vocabulary/ModalVocabularyEdit.vue";
import i18n from "@/services/i18n";
import { PlusOutlined } from "@ant-design/icons-vue";

// States
const showModalVoabularyAdd = ref(false);
const vocaEdit = ref<IVocabulary | null>(null);
const vocabulariesResponse = ref<IVocabulariesResponse>();
const vocabularyRequest = ref<IVocabularyRequest>({
  query: QUERY_DEFAULT,
  page: PAGE_FIRST,
  pageSize: PAGE_SIZE_DEFAULT + 10,
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

const handleDelete = async (o: IVocabulary) => {
  const currentPage = vocabularyRequest.value.page;
  if (currentPage !== undefined && loadedPages.value[currentPage]) {
    const currentPageData = loadedPages.value[currentPage].data?.results;
    if (currentPageData) {
      const indexToRemove = currentPageData.findIndex(
        (item) => item.id === o.id
      );
      if (indexToRemove !== -1) {
        currentPageData.splice(indexToRemove, 1);
        try {
          if (o.id !== undefined) {
            await deleteVoca(o.id);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
};

const handleUpdate = async (o: IVocabulary) => {
  try {
    if (o.id) {
      await updateVocabulary(o.id, o);
      vocaEdit.value = null;
    }
  } catch (error) {
    console.error(error);
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
