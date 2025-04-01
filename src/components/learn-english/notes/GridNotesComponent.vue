<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
    <a-card
      v-for="note in notes"
      :loading="getLoadingGet()"
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
        id="CONTENT"
        class="text-[10px] sm:text-[14px] text-left min-h-[50px] md:min-h-[100px]"
      >
        {{ note.detail }}
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Card as ACard } from "ant-design-vue";
import { PushpinOutlined as AIcon } from "@ant-design/icons-vue";
import { INote } from "@/models/INote";
import { getLoadingGet } from "@/utils/loadingUtils";

const props = defineProps({
  notes: {
    type: Array as () => Array<INote>,
    required: false,
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
  padding: 2px 2px 2px 2px;
}
</style>
