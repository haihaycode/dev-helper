<template>
  <LearnEnglishPagePatternLayout
    :title="truncateString(noteData.title || '...', 30)"
  >
    <template #content>
      <div class="CONTENT">
        <div class="bg-white rounded-sm shadow-sm relative">
          <div id="CONTENT-NOTE" class="editor-container relative">
            <QuillEditor
              v-if="isEditingNoteContent"
              v-model:content="noteData.notes"
              contentType="html"
              :toolbar="toolbarOptions"
              theme="snow"
              class="h-[500px] mb-2"
            />
            <div
              v-else
              class="ql-editor-viewer mb-2 text-left"
              v-html="noteData.notes"
            ></div>
            <div class="flex justify-end items-center space-x-2 mx-2">
              <span>
                {{ getRelativeTime(noteData.updated_at) }}
              </span>
              <EditOutlined
                class="text-gray-500 hover:text-blue-500 cursor-pointer"
                @click="handleEditContent"
              />
            </div>
          </div>

          <div
            id="TITLE"
            class="flex items-center space-x-2 px-2 text-gray-500 border-white"
          >
            <p v-if="!isEditing" class="text-sm text-left md:text-md font-bold">
              {{ noteData.title || "..." }}
            </p>
            <input
              v-else
              v-model="noteData.title"
              ref="titleInput"
              class="text-sm font-bold w-[90%] px-0 py-2 dashed-border text-gray-500 rounded-sm focus:outline-none focus:ring-0 focus:ring-gray-900"
            />
            <EditOutlined
              class="text-gray-500 hover:text-blue-500 cursor-pointer text-sm md:text-md flex items-center"
              @click="startEditing"
            />
          </div>

          <div id="DETAIL" class="flex justify-start">
            <textarea
              v-model="noteData.detail"
              ref="titleInput"
              class="text-sm font-light w-[99%] mx-2 py-2 dashed-border text-gray-500 rounded-sm focus:outline-none focus:ring-0 focus:ring-gray-900"
            />
          </div>

          <div id="ACTION" class="mt-4 flex justify-end space-x-2 p-2">
            <a-button
              class="bg-gradient-to-br from-blue-500 to-gray-600 rounded-sm"
              @click="handleSave"
              type="primary"
            >
              {{ i18n.global.t("btn.save") }}
            </a-button>
          </div>
        </div>
      </div>
    </template>
  </LearnEnglishPagePatternLayout>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import { EditOutlined } from "@ant-design/icons-vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import i18n from "@/services/i18n";
import LearnEnglishPagePatternLayout from "../LearnEnglishPagePatternLayout.vue";
import { INote } from "@/models/INote";
import { getOneBySlug, update } from "@/api/noteApi";
import { useRoute, useRouter } from "vue-router";
import { truncateString } from "@/utils/StringUtils";
import { getRelativeTime } from "@/utils/global";

const route = useRoute();
const router = useRouter();
const isEditing = ref(false);
const isEditingNoteContent = ref(false);
const titleInput = ref<HTMLInputElement | null>(null);

const noteData = ref<INote>({
  id: 0,
  title: "",
  detail: "",
  notes: "",
  user_id: 0,
  is_deleted: false,
  slug: "",
  deleted_at: null,
  created_at: "",
  updated_at: "",
  is_public: false,
});

const startEditing = () => {
  isEditing.value = true;
  nextTick(() => {
    titleInput.value?.focus();
  });
};
const handleEditContent = () => {
  isEditingNoteContent.value = !isEditingNoteContent.value;
};

const handleSave = async () => {
  try {
    const response = await update(noteData.value.id, noteData.value);
    if (response?.data) {
      noteData.value = response.data;
      updateSlug(noteData.value.slug);
    }
  } catch (err) {
    console.error(err);
  }
};
const updateSlug = (newSlug: string) => {
  router.push({ path: `/l/english/tab=notes/${newSlug}` });
};
onMounted(async () => {
  const slug = route.params.slug as string;
  if (slug) {
    try {
      const response = await getOneBySlug(slug);
      if (response?.data) {
        noteData.value = response.data;
      } else {
        router.push({ name: "NotFoundPage" });
      }
    } catch (err) {
      console.error(err);
    }
  }
});

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image", "video"],
];
</script>

<style scoped>
.editor-container {
  border: 0px solid #d9d9d9;
  border-radius: 0px;
  overflow: hidden;
}

:deep(.ql-toolbar) {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background-color: #f5f5f5;
}

:deep(.ql-container) {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  min-height: 300px;
}

:deep(.ql-editor) {
  min-height: 300px;
  font-size: 14px;
  line-height: 1.5;
}
.ql-editor-viewer {
  @apply border border-gray-200 rounded p-4 min-h-[300px] text-sm leading-relaxed;
}
</style>
