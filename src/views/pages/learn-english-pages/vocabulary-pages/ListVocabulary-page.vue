<template>
  <LearnEnglishPagePatternLayout :title="$t('nav.l.english.listVocabulary')">
    <template #content>
      <div id="listVocabulary">
        <div class="flex justify-end navigation mb-2">
          <button
            v-t="'nav.l.english.btn.addVocabulary'"
            class="px-2 py-2 bg-blue-900 hover:bg-blue-400 rounded-sm text-white"
            @click="showModalVoabularyAdd = true"
          ></button>
        </div>
        <div id="content ">
          <TableVocabulariesComponent :vocabularyList="listVocabulary" />
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
import { ref } from "vue";

const showModalVoabularyAdd = ref(false);
const listVocabulary = [
  {
    english: "Hello",
    translate: "Xin chào",
    image:
      "https://www.google.com.vn/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    example_sentence: "Hello, how are you?",
  },
  {
    english: "Goodbye",
    translate: "Tạm biệt",
    image:
      "https://www.google.com.vn/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    example_sentence: "Goodbye, see you later!",
  },
  {
    english: "Thank you",
    translate: "Cảm ơn",
    image:
      "https://www.google.com.vn/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    example_sentence: "Thank you for your help!",
  },
  {
    english: "Sorry",
    translate: "Xin lỗi",
    image:
      "https://www.google.com.vn/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    example_sentence: "I'm sorry for my mistake!",
  },
  {
    english: "Yes",
    translate: "Có",
    image:
      "https://www.google.com.vn/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    example_sentence: "Yes, I can help you!",
  },
  {
    english: "No",
    translate: "Không",
    image:
      "https://www.google.com.vn/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    example_sentence: "No, I can't help you!",
  },
  {
    english: "Please",
    translate: "Làm ơn",
    image:
      "https://www.google.com.vn/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    example_sentence: "Please, help me!",
  },
  {
    english: "Excuse me",
    translate: "Xin lỗi",
    image:
      "https://www.google.com.vn/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    example_sentence: "Excuse me, can you help me?",
  },
];
</script>
