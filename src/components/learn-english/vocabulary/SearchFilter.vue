<template>
  <div id="searchFilter" class="min-w-2 max-w-3xl">
    <div class="flex items-center justify-center rounded-sm">
      <a-input
        type="text"
        v-model="searchValue"
        @input="onInput"
        placeholder="Search..."
        class="flex-1 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 rounded-sm text-gray-700"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const searchValue = ref("");
// eslint-disable-next-line no-undef
const emit = defineEmits(["search"]);
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const onInput = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    emit("search", searchValue.value);
  }, 300);
};
</script>
