<template>
  <LearnEnglishPagePatternLayout :title="i18n.global.t('vocabulary.list')">
    <template #content>
      <div id="LIST-VOCA">
        <div id="ACTION">
          <div
            class="flex justify-between flex-wrap space-y-2 md:space-y-0 navigation mb-2"
          >
            <SearchFilter @search="handleSearch" />
            <div class="flex justify-end space-x-2">
              <button
                class="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-gray-600 text-white hover:bg-blue-700 shadow transition-all duration-200"
                @click="showModalVoabularyAdd = true"
              >
                <PlusOutlined class="text-base flex items-center" />
                <span>{{ i18n.global.t("vocabulary.add_new") }}</span>
              </button>
              <button
                class="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-black hover:bg-gray-300 shadow transition-all duration-200"
                @click="isSelectPractice = !isSelectPractice"
              >
                <span>
                  {{ !isSelectPractice ? "Chọn luyện tập" : "Hủy chọn" }}
                </span>
              </button>
            </div>
          </div>
          <div>
            <DateRangePicker @dateChange="handleDateChange" />
          </div>
        </div>
        <div id="CONTENT ">
          <TableVocabulariesComponent
            :is-select-practice="isSelectPractice"
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
      <div
        id="DIRECTION"
        class="flex justify-center md:justify-end px-2 mt-4"
        v-if="!getLoadingGet()"
      >
        <button
          @click="goToPracticePage"
          class="px-5 py-2 bg-white hover:bg-gray-200 text-black font-semibold rounded-lg flex items-center gap-2 shadow"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Bắt đầu luyện tập
        </button>
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
import { useRouter } from "vue-router";
import { getLoadingGet } from "@/utils/loadingUtils";
import DateRangePicker from "@/components/learn-english/vocabulary/DateRangePicker.vue";

// States
const isSelectPractice = ref(false);
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
  startDate: "",
  endDate: "",
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

const router = useRouter();

const goToPracticePage = () => {
  router.push({ name: "PracticeVocaPage" });
};

const handleDateChange = (startDate: string, endDate: string) => {
  vocabularyRequest.value.startDate = startDate;
  vocabularyRequest.value.endDate = endDate;
  vocabularyRequest.value.page = 1;
  loadedPages.value = {};
  handleFetchVocabulary();
};

onMounted(() => {
  handleFetchVocabulary();
});

watchEffect(() => {
  handleFetchVocabulary();
});
</script>
