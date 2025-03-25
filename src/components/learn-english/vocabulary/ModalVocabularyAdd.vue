<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <!-- Modal Background -->
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <!-- Modal Container -->
    <div class="bg-white text-left text-blue-900 rounded-lg shadow-lg w-96 p-6">
      <!-- Header -->
      <div
        class="flex items-center justify-between border-b border-blue-800 pb-2 mb-4"
      >
        <h2 class="text-xl font-bold text-blue-900">Add Vocabulary</h2>
        <button @click="closeModal" class="text-white hover:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6 text-red-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit">
        <!-- Word Input -->
        <div class="mb-4">
          <label class="block mb-1 font-medium">English Word</label>
          <input
            type="text"
            v-model="form.word"
            placeholder="Enter the word"
            class="w-full px-0 py-2 dashed-border text-black rounded-sm focus:outline-none focus:ring-0 focus:ring-blue-900"
          />
          <p v-if="errors.word" class="text-red-400 text-sm">
            {{ errors.word }}
          </p>
        </div>

        <!-- Translation Input -->
        <div class="mb-4">
          <label class="block mb-1 font-medium">Translation (Vietnamese)</label>
          <input
            type="text"
            v-model="form.translation"
            placeholder="Enter the translation"
            class="w-full px-0 py-2 dashed-border text-black rounded-sm focus:outline-none focus:ring-0 focus:ring-blue-900"
          />
          <p v-if="errors.translation" class="text-red-400 text-sm">
            {{ errors.translation }}
          </p>
        </div>

        <!-- Image Upload -->
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

        <!-- Example Sentence -->
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

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Add Vocabulary
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import * as yup from "yup";
import { defineProps, defineEmits } from "vue";

// Define props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

// Emit events
const emit = defineEmits(["update:modelValue"]);

// Reactive form state
const form = reactive({
  word: "",
  translation: "",
  image: null as File | null,
  example_sentence: "",
});

// Validation errors
const errors: { [key: string]: string } = reactive({
  word: "",
  translation: "",
  image: "",
  example_sentence: "",
});

// Yup schema for validation
const schema = yup.object().shape({
  word: yup.string().required("Word is required"),
  translation: yup.string().required("Translation is required"),
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

// Watch prop for visibility
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
  // Reset errors
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  try {
    await schema.validate(form, { abortEarly: false });
    console.log("Form data is valid:", form);
    alert("Vocabulary added successfully!");
    closeModal();
  } catch (validationErrors: any) {
    (validationErrors as yup.ValidationError).inner.forEach((err: any) => {
      errors[err.path] = err.message;
    });
  }
};

// Handle file upload
const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  form.image = file || null;
};

// Close modal
const closeModal = () => {
  emit("update:modelValue", false);
};
</script>

<style scoped>
.dashed-border {
  border-bottom: 1px dashed #1d4ed8;
}
</style>
