<template>
  <div id="GRID-NOTES-COMPONENT">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
      <a-card
        v-for="note in notes"
        :hoverable="true"
        :key="note.id"
        :class="[
          'p-1 rounded-sm shadow-sm relative bg-opacity-30',
          getRandomColor(note.id),
        ]"
      >
        <div class="flex justify-between items-center">
          <p class="text-[12px] sm:text-[15px] font-bold text-left max-w-[90%]">
            {{ note.title.toLocaleUpperCase() }}
          </p>
          <a-icon
            type="pushpin"
            class="text-[10px] sm:text-[20px] flex items-start absolute top-1 right-1 text-gray-700"
          />
        </div>
        <div
          id="CONTENT-DETAILS"
          class="text-[10px] sm:text-[14px] text-left min-h-[50px] md:min-h-[100px]"
        >
          {{ truncateText(note.detail, 50) }}
          <span
            v-if="note.detail.length > 50"
            class="text-blue-600 cursor-pointer font-semibold"
          >
            ...xem thêm
          </span>
        </div>
      </a-card>
    </div>
    <div
      v-if="loading"
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 mt-1 opacity-40"
    >
      <a-card
        v-for="i in PAGE_SIZE"
        :loading="loading"
        :hoverable="false"
        :key="i"
        class="p-1 rounded-sm shadow-sm"
      >
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Card as ACard } from "ant-design-vue";
import { PushpinOutlined as AIcon } from "@ant-design/icons-vue";
import { INote } from "@/models/INote";
import { PAGE_SIZE_DEFAULT, truncateText } from "@/utils/global";

const PAGE_SIZE =
  window.innerWidth <= 640 ? PAGE_SIZE_DEFAULT - 2 : PAGE_SIZE_DEFAULT + 2;
defineProps({
  notes: {
    type: Array as () => Array<INote>,
    required: false,
  },
  loading: {
    type: Boolean,
  },
});
const colors = [
  "bg-red-400",
  "bg-green-400",
  "bg-blue-400",
  "bg-yellow-400",
  "bg-indigo-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-teal-400",
  "bg-cyan-400",
];

const getRandomColor = (index: number) => {
  return colors[index % colors.length];
};
</script>
<style>
.ant-card-body {
  min-height: 200px;
  padding: 2px;
}

@media (max-width: 768px) {
  .ant-card-body {
    min-height: 120px;
  }
}
</style>
