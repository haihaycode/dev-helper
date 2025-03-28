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
import { debounce } from "lodash";
import { defineEmits } from "vue";

// Reactive search value
const searchValue = ref("");

// Emit event for parent component
const emit = defineEmits(["search"]);

// Debounced emit function
const debouncedEmit = debounce(() => {
  console.log("Debounced function executed"); // Debug if debounce works
  console.log("Debounced search value:", searchValue.value); // Debug if searchValue updates
  emit("search", searchValue.value);
}, 300);

// Input handler
const onInput = () => {
  console.log("Raw input value:", searchValue.value); // Debug immediate input value
  debouncedEmit(); // Call debounced function
};
</script>
