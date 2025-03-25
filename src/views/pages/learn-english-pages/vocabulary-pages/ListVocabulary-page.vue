<template>
  <LearnEnglishPagePatternLayout :title="$t('nav.l.english.listVocabulary')">
    <template #content>
      <div id="listVocabulary">
        <div class="flex justify-end action">
          <button
            class="px-2 bg-blue-900 hover:bg-blue-400 rounded-sm text-white"
            @click="showModalVoabularyAdd = true"
          >
            Add more +
          </button>
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
import { useStore } from "vuex";
import { computed, ref } from "vue";
const store = useStore();
const locale = computed(() => store.getters["locale/locale"]);
const showModalVoabularyAdd = ref(false);

console.log(locale);
</script>
