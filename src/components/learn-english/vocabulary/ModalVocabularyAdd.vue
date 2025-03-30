<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <AntModal :visible="show" @cancel="closeModal_noLoad">
    <div
      class="flex items-center justify-between border-b border-blue-800 pb-2 mb-4"
    >
      <h2 class="text-xl font-bold text-blue-900">Add Vocabulary</h2>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block mb-1 font-medium">English Word</label>
        <input
          type="text"
          v-model="form.english"
          placeholder="Enter the word"
          class="w-full px-0 py-2 dashed-border text-black rounded-sm focus:outline-none focus:ring-0 focus:ring-blue-900"
        />
        <p v-if="errors.english" class="text-red-400 text-sm">
          {{ errors.english }}
        </p>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Translation (Vietnamese)</label>
        <input
          type="text"
          v-model="form.translate"
          placeholder="Enter the translate"
          class="w-full px-0 py-2 dashed-border text-black rounded-sm focus:outline-none focus:ring-0 focus:ring-blue-900"
        />
        <p v-if="errors.translate" class="text-red-400 text-sm">
          {{ errors.translate }}
        </p>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Image (optional)</label>
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
        <label class="block mb-1 font-medium">Example Sentence</label>
        <textarea
          v-model="form.example_sentence"
          placeholder="Enter an example sentence"
          class="w-full px-0 py-2 dashed-border text-black rounded-sm focus:outline-none focus:ring-0 focus:ring-blue-900"
        ></textarea>
        <p v-if="errors.example_sentence" class="text-red-400 text-sm">
          {{ errors.example_sentence }}
        </p>
      </div>

      <a-button
        type="primary"
        @click="handleSubmit"
        class="w-full h-12 rounded-sm bg-blue-900 hover:bg-gray-200 border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus:bg-blue-700"
        :loading="getLoadingPost()"
      >
        {{ $t("Add Vocablary") }}
      </a-button>
    </form>
  </AntModal>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import * as yup from "yup";
import { defineProps, defineEmits } from "vue";
import AntModal from "@/components/container/AntModal.vue";
import { IVocabulary } from "@/models/IIearnEnglish";
import { fileToBase64 } from "@/utils/global";
import { createVocabulary } from "@/api/vocabulary";
import { message } from "ant-design-vue";
import { translate } from "@/utils/global";
import { getLoadingPost } from "@/utils/loadingUtils";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue", "closenoload"]);
const form = reactive({
  english: "",
  translate: "",
  image: null as File | null,
  example_sentence: "",
});
const errors: { [key: string]: string } = reactive({
  english: "",
  translate: "",
  image: "",
  example_sentence: "",
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
  example_sentence: yup
    .string()
    .required("Example sentence is required")
    .max(200, "Example sentence must be less than 200 characters"),
});

const show = reactive({
  value: false,
});

watch(
  // eslint-disable-next-line no-undef
  () => props.modelValue,
  (newValue) => {
    show.value = newValue;
  }
);

// Handle form submission
const handleSubmit = async () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
  try {
    await schema.validate(form, { abortEarly: false });
    const vocabularyNew: IVocabulary = {
      english: form.english,
      translate: form.translate,
      image: form.image ? await fileToBase64(form.image as File) : undefined,
      example_sentence: form.example_sentence,
    };
    if (
      vocabularyNew.english &&
      vocabularyNew.translate &&
      vocabularyNew.example_sentence
    ) {
      await createVocabulary(vocabularyNew);
    } else {
      throw new Error("Required vocabulary data is missing");
    }
    message.success(translate("message.success"));
    closeModal_Load();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (validationErrors: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
const closeModal_Load = () => {
  emit("update:modelValue", false);
};
const closeModal_noLoad = () => {
  emit("closenoload", false);
};
</script>
