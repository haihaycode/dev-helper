<template>
  <LearnEnglishPagePatternLayout :title="$t('nav.l.english.listVocabulary')">
    <template #content>
      <div id="listVocabulary">
        <div class="flex justify-between navigation mb-2">
          <SearchFilter @search="handleFetchVocabulary" />
          <button
            v-t="'nav.l.english.btn.addVocabulary'"
            class="px-2 py-2 bg-blue-900 hover:bg-blue-400 rounded-sm text-white"
            @click="showModalVoabularyAdd = true"
          ></button>
        </div>
        <div id="content ">
          <TableVocabulariesComponent
            :vocabularyList="vocabulariesResponse?.data?.results"
          />
        </div>
      </div>

      <ModalVocabularyAdd
        v-if="showModalVoabularyAdd"
        :modelValue="showModalVoabularyAdd"
        @update:modelValue="showModalVoabularyAdd = $event"
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
import { ref, watchEffect, onMounted } from "vue";

import {
  IVocabularyRequest,
  IVocabulariesResponse,
} from "@/models/IIearnEnglish";
import { getAllVocabularies } from "@/api/vocabulary";

const showModalVoabularyAdd = ref(false); //modal add vocabulary

const vocabulariesResponse = ref<IVocabulariesResponse>();
const vocabularyRequest = ref<IVocabularyRequest>({
  query: "",
  page: 1,
  pageSize: 5,
  is_deleted: false,
  orderBy: {
    column: "id",
    order: "desc",
  },
});

const handleFetchVocabulary = async (searchValue: string) => {
  vocabularyRequest.value.query = searchValue;
  vocabulariesResponse.value = await getAllVocabularies(
    vocabularyRequest.value
  );
};

onMounted(() => {
  handleFetchVocabulary("");
});
watchEffect(() => {
  handleFetchVocabulary("");
});
</script>
