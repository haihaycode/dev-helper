<template>
  <a-drawer
    :visible="show"
    :closable="false"
    @close="handleClose"
    :width="isSmallScreen ? '100%' : 400"
    :placement="isSmallScreen ? 'bottom' : 'right'"
    :height="isSmallScreen ? '50vh' : undefined"
  >
    <div>
      <div class="flex items-center justify-between">
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

      <div id="content" class="bg-white mx-auto">
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
import { CloseOutlined, EditOutlined } from "@ant-design/icons-vue";
import { getRelativeTime } from "@/utils/global";

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
