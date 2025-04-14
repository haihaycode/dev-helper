<template>
  <a-drawer
    :visible="show"
    :closable="false"
    @close="handleClose"
    :width="isSmallScreen ? '100%' : 400"
    :placement="isSmallScreen ? 'bottom' : 'right'"
    :height="isSmallScreen ? '85%' : undefined"
  >
    <div class="p-2">
      <div class="flex items-center justify-between mb-4">
        <span class="text-xl font-semibold text-blue-900">
          {{ selectedVocabulary?.english?.toUpperCase() }}
        </span>
        <div class="flex items-center space-x-2 text-md">
          <EditOutlined
            class="flex items-center cursor-pointer text-blue-900"
            @click="
              () => {
                handleClose();
                emit('edit', selectedVocabulary);
              }
            "
          />
          <CloseOutlined
            class="flex items-center cursor-pointer text-blue-900"
            type="close"
            @click="handleClose"
          />
        </div>
      </div>

      <div v-if="isLoading" class="space-y-2">
        <a-card :loading="isLoading" :hoverable="false" class="border-none" />
      </div>

      <!-- Phần hiển thị dữ liệu từ điển -->
      <div v-else-if="dictionaryData" class="space-y-2">
        <!-- Phát âm -->
        <div class="p-2 rounded-lg">
          <div class="flex flex-wrap gap-2">
            <div
              v-for="(phonetic, index) in dictionaryData.phonetics"
              :key="index"
              class="flex items-center space-x-2 bg-white p-2 rounded-md shadow-sm"
            >
              <span v-if="phonetic.text" class="text-gray-700">{{
                phonetic.text
              }}</span>
              <button
                v-if="phonetic.audio"
                @click="playAudio(phonetic.audio)"
                class="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
              >
                <SoundOutlined class="text-blue-600 flex items-center" />
              </button>
            </div>
          </div>
        </div>

        <!-- Nghĩa -->
        <div
          v-for="(meaning, index) in dictionaryData.meanings"
          :key="index"
          class="p-2 rounded-lg"
        >
          <h3 class="text-lg font-semibold text-blue-900 mb-2">
            {{ meaning.partOfSpeech.toUpperCase() }}
          </h3>
          <!-- Định nghĩa -->
          <div class="space-y-3">
            <div
              v-for="(def, defIndex) in meaning.definitions"
              :key="defIndex"
              class="p-2 rounded-md shadow-sm"
            >
              <p class="text-gray-700">{{ def.definition }}</p>
              <p v-if="def.example" class="text-gray-600 italic mt-1">
                Example: {{ def.example }}
              </p>

              <!-- Từ đồng nghĩa -->
              <div v-if="def.synonyms.length" class="mt-2">
                <span class="text-sm font-medium text-gray-500">Synonyms:</span>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span
                    v-for="(syn, synIndex) in def.synonyms"
                    :key="synIndex"
                    class="px-2 py-1 bg-green-100 text-green-800 rounded-sm text-sm"
                  >
                    {{ syn }}
                  </span>
                </div>
              </div>

              <!-- Từ trái nghĩa -->
              <div v-if="def.antonyms.length" class="mt-2">
                <span class="text-sm font-medium text-gray-500">Antonyms:</span>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span
                    v-for="(ant, antIndex) in def.antonyms"
                    :key="antIndex"
                    class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                  >
                    {{ ant }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Nguồn -->
        <div class="p-2">
          <div class="space-y-2">
            <a
              v-for="(url, index) in dictionaryData.sourceUrls"
              :key="index"
              :href="url"
              target="_blank"
              class="text-blue-600 hover:text-blue-800 block"
            >
              {{ url }}
            </a>
          </div>
        </div>
      </div>

      <!-- Phần hiển thị dữ liệu từ vựng hiện tại -->
      <div id="content" class="bg-white mx-auto mt-6">
        <p class="text-lg text-gray-700 mb-2">
          <strong>Translate : </strong> {{ selectedVocabulary?.translate }}
        </p>

        <p v-if="selectedVocabulary?.notes" class="text-lg text-gray-700 mb-2">
          <strong>{{ i18n.global.t("vocabulary.notes") }} : </strong>
          {{ selectedVocabulary?.notes }}
        </p>
        <p
          v-if="selectedVocabulary?.example_sentence"
          class="text-lg text-gray-700 mb-2"
        >
          <strong>{{ i18n.global.t("vocabulary.example_sentence") }} :</strong>
          {{ selectedVocabulary?.example_sentence }}
        </p>

        <!-- Hiển thị hình ảnh nếu có -->
        <div v-if="selectedVocabulary?.image" class="mt-4">
          <strong class="block text-blue-900 text-lg mb-2">Image:</strong>
          <img
            :src="selectedVocabulary.image"
            alt="Vocabulary Image"
            class="rounded-lg shadow-md max-w-full h-auto"
          />
        </div>

        <p
          v-if="selectedVocabulary?.updated_at"
          class="text-sm text-gray-700 mb-2"
        >
          <span class="text-xs text-gray-500">
            {{ getRelativeTime(selectedVocabulary?.updated_at) }}</span
          >
        </p>
      </div>
    </div>
  </a-drawer>
</template>
<script lang="ts" setup>
import {
  ref,
  defineProps,
  onMounted,
  onUnmounted,
  defineEmits,
  PropType,
  reactive,
  watch,
} from "vue";
import { IVocabulary } from "@/models/IIearnEnglish";
import "ant-design-vue/dist/antd.css";
import i18n from "@/services/i18n";
import {
  CloseOutlined,
  EditOutlined,
  SoundOutlined,
} from "@ant-design/icons-vue";
import { getRelativeTime } from "@/utils/global";
import { getVocabularyByDictionary } from "@/api/dictionaryApi";
import { IDictionaryEntry } from "@/models/IDictionaryEntry";

const dictionaryData = ref<IDictionaryEntry | null>(null);
const isLoading = ref(false);

const playAudio = (audioUrl: string) => {
  const audio = new Audio(audioUrl);
  audio.play();
};

const getInfo = async (word: string) => {
  try {
    isLoading.value = true;
    const response = await getVocabularyByDictionary(word);
    if (response && response.length > 0) {
      dictionaryData.value = response[0];
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const emit = defineEmits(["close", "edit"]);
const props = defineProps({
  drawerVisible: {
    type: Boolean,
    required: true,
  },
  vocabulary: {
    type: Object as PropType<IVocabulary>,
    required: true,
  },
});
const selectedVocabulary = ref<IVocabulary | null>(null);
const show = reactive({
  value: false,
});

watch(
  () => props.drawerVisible,
  (newValue) => {
    show.value = newValue ? true : false;
    if (newValue && props.vocabulary) {
      if (!selectedVocabulary.value) {
        selectedVocabulary.value = {} as IVocabulary;
      }
      getInfo(props.vocabulary.english || "");
      selectedVocabulary.value.created_at = props.vocabulary.created_at;
      selectedVocabulary.value.updated_at = props.vocabulary.updated_at;
      selectedVocabulary.value.id = props.vocabulary.id;
      selectedVocabulary.value.english = props.vocabulary.english || "";
      selectedVocabulary.value.translate = props.vocabulary.translate || "";
      selectedVocabulary.value.image = undefined;
      selectedVocabulary.value.example_sentence =
        props.vocabulary.example_sentence || "";
      selectedVocabulary.value.notes = props.vocabulary.notes || undefined;
      selectedVocabulary.value.is_special =
        props.vocabulary.is_special || false;
    }
  },
  { immediate: true }
);

const isSmallScreen = ref(false);
const handleResize = () => {
  isSmallScreen.value = window.innerWidth <= 640;
};
const handleClose = () => {
  emit("close");
};
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
