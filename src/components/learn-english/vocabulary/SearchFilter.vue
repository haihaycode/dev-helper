<template>
  <div id="searchFilter" class="min-w-2 max-w-3xl">
    <div class="flex items-center justify-center rounded-sm">
      <input
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
import { debounce } from "lodash";
import { defineEmits } from "vue";
const searchValue = ref("");
const emit = defineEmits(["search"]);
const debounceDelay = 500;
const debouncedEmit = debounce(() => {
  emit("search", searchValue.value);
}, debounceDelay);
const onInput = () => {
  debouncedEmit();
};
</script>
