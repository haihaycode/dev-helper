<template>
  <LearnEnglishPagePatternLayout :title="'detail'">
    <template #content>
      <div id="NOTE-DETAIL-PAGE" class="p-4 bg-white shadow-lg rounded-lg">
        <!-- Thanh công cụ -->
        <div class="mb-2 flex flex-wrap gap-2 border-b pb-2">
          <a-button
            @click="editor?.chain().focus().toggleBold().run()"
            :class="{ 'bg-blue-500 text-white': editor?.isActive('bold') }"
          >
            <BoldOutlined />
          </a-button>
          <a-button
            @click="editor?.chain().focus().toggleItalic().run()"
            :class="{ 'bg-blue-500 text-white': editor?.isActive('italic') }"
          >
            <ItalicOutlined />
          </a-button>
          <a-button
            @click="editor?.chain().focus().toggleUnderline().run()"
            :class="{ 'bg-blue-500 text-white': editor?.isActive('underline') }"
          >
            <UnderlineOutlined />
          </a-button>
          <a-button
            @click="editor?.chain().focus().setColor('#ff0000').run()"
            class="text-red-500"
            >🔴</a-button
          >
          <a-button
            @click="editor?.chain().focus().setColor('#00ff00').run()"
            class="text-green-500"
            >🟢</a-button
          >
          <a-button
            @click="editor?.chain().focus().setColor('#0000ff').run()"
            class="text-blue-500"
            >🔵</a-button
          >
        </div>

        <!-- Trình soạn thảo -->
        <editor-content
          :editor="editor || undefined"
          class="border p-2 min-h-[200px] rounded-md shadow-sm"
        />
      </div>
    </template>
  </LearnEnglishPagePatternLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from "@ant-design/icons-vue";
import LearnEnglishPagePatternLayout from "../LearnEnglishPagePatternLayout.vue";

const editor = ref<Editor>();

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit, Underline, TextStyle, Color],
    content: "<p>...</p>",
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style>
.tiptap {
  min-height: 200px;
  outline: none;
}
</style>
