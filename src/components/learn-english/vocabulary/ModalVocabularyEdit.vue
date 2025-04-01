<template>
  <AntModal :visible="show" @cancel="closeModal(false, null)">
    <div
      class="flex items-center justify-between border-b border-blue-800 pb-2"
    >
      <h2 class="text-xl font-bold text-blue-900">
        {{ i18n.global.t("vocabulary.edit") }}
      </h2>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="flex justify-end operation">
        <div @click="form.is_special = !form.is_special" class="mt-2">
          <StarFilled
            v-show="form.is_special"
            class="text-yellow-300 text-2xl flex items-center transition-colors duration-500 hover:text-yellow-200"
          />
          <StarOutlined
            v-show="!form.is_special"
            class="text-gray-300 text-2xl flex items-center transition-colors duration-500 hover:text-gray-500"
          />
        </div>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">{{
          i18n.global.t("vocabulary.word")
        }}</label>
        <input
          type="text"
          v-model="form.english"
          :placeholder="i18n.global.t('vocabulary.word_placeholder')"
          class="w-full px-0 py-2 dashed-border text-black rounded-sm focus:outline-none focus:ring-0 focus:ring-blue-900"
          ref="englishFieldref"
        />
        <p v-if="errors.english" class="text-red-400 text-sm">
          {{ errors.english }}
        </p>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">{{
          i18n.global.t("vocabulary.translate")
        }}</label>
        <input
          type="text"
          v-model="form.translate"
          :placeholder="i18n.global.t('vocabulary.translate_placeholder')"
          class="w-full px-0 py-2 dashed-border text-black rounded-sm focus:outline-none focus:ring-0 focus:ring-blue-900"
        />
        <p v-if="errors.translate" class="text-red-400 text-sm">
          {{ errors.translate }}
        </p>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium"
          >{{ i18n.global.t("image.image") }}
          {{ i18n.global.t("image.optional") }}</label
        >
        <input
          type="file"
          @change="handleFileUpload"
          accept="image/*"
          class="w-full px-0 py-2 dashed-border text-black rounded-sm focus:outline-none focus:ring-0 focus:ring-blue-900"
        />
        <p v-if="errors.image" class="text-red-400 text-sm">
          {{ errors.image }}
        </p>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">{{
          i18n.global.t("vocabulary.notes")
        }}</label>
        <textarea
          v-model="form.notes"
          :placeholder="i18n.global.t('vocabulary.notes_enter')"
          class="w-full px-0 py-2 dashed-border text-black rounded-sm focus:outline-none focus:ring-0 focus:ring-blue-900"
          rows="4"
        ></textarea>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">{{
          i18n.global.t("vocabulary.example_sentence")
        }}</label>
        <textarea
          v-model="form.example_sentence"
          :placeholder="i18n.global.t('vocabulary.example_sentence_enter')"
          class="w-full px-0 py-2 dashed-border text-black rounded-sm focus:outline-none focus:ring-0 focus:ring-blue-900"
          rows="4"
        ></textarea>
      </div>

      <a-button
        type="primary"
        @click="handleSubmit"
        class="w-full h-12 rounded-sm bg-blue-900 hover:bg-gray-200 border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus:bg-blue-700"
        :loading="getLoadingPut()"
      >
        {{ i18n.global.t("btn.save_changes") }}
      </a-button>
    </form>
  </AntModal>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from "vue";
import * as yup from "yup";
import { defineProps, defineEmits } from "vue";
import AntModal from "@/components/container/AntModal.vue";
import { IVocabulary } from "@/models/IIearnEnglish";
import { fileToBase64 } from "@/utils/global";
import { getLoadingPut } from "@/utils/loadingUtils";
import { StarFilled, StarOutlined } from "@ant-design/icons-vue";
import i18n from "@/services/i18n";

// Props and emits
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: null,
  },
  vocabularyToEdit: {
    type: Object as () => IVocabulary | null,
  },
});
const emit = defineEmits(["update:modelValue"]);

const form = reactive<{
  id?: number;
  english: string;
  translate: string;
  image: File | null;
  example_sentence: string | null;
  tags: string;
  notes: string | null;
  is_special: boolean;
}>({
  english: "",
  translate: "",
  image: null,
  example_sentence: null,
  tags: "",
  notes: null,
  is_special: false,
});

const errors: { [key: string]: string } = reactive({
  english: "",
  translate: "",
  image: "",
});

const schema = yup.object().shape({
  english: yup.string().required("Word is required"),
  translate: yup.string().required("Translation is required"),
  image: yup
    .mixed()
    .nullable()
    .test(
      "fileSize",
      "File is too large (max 2MB)",
      (value) => !value || (value instanceof File && value.size <= 2097152)
    ),
});

const show = reactive({
  value: false,
});
const englishFieldref = ref<HTMLInputElement | null>(null);

watch(
  () => props.modelValue,
  (newValue) => {
    show.value = newValue;
    if (newValue && props.vocabularyToEdit) {
      form.id = props.vocabularyToEdit.id;
      form.english = props.vocabularyToEdit.english || "";
      form.translate = props.vocabularyToEdit.translate || "";
      form.image = null;
      form.example_sentence = props.vocabularyToEdit.example_sentence || "";
      form.notes = props.vocabularyToEdit.notes || null;
      form.is_special = props.vocabularyToEdit.is_special || false;
    }
  },
  { immediate: true }
);
const handleSubmit = async () => {
  Object.keys(errors).forEach((key) => (errors[key] = ""));
  try {
    await schema.validate(form, { abortEarly: false });

    const vocabularyNew: IVocabulary = {
      id: form.id,
      english: form.english.trim(),
      translate: form.translate.trim(),
      image: form.image ? await fileToBase64(form.image as File) : undefined,
      example_sentence: form.example_sentence?.trim(),
      is_special: !!form.is_special,
      tags: form.tags.trim(),
      notes: form.notes?.trim(),
    };
    if (vocabularyNew.english && vocabularyNew.translate) {
      closeModal(true, vocabularyNew);
    } else {
      throw new Error("Required vocabulary data is missing");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (validationErrors: any) {
    if (validationErrors?.inner) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validationErrors.inner.forEach((err: any) => {
        errors[err.path] = err.message;
      });
    } else {
      console.error(
        "Validation errors structure is incorrect or there were no errors."
      );
    }
  }
};

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  form.image = file || null;
};

const closeModal = (loading: boolean, o: IVocabulary | null) => {
  emit("update:modelValue", {
    loading,
    o,
  });
};
</script>
