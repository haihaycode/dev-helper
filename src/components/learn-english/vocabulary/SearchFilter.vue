<template>
  <div id="searchFilter" class="min-w-2 max-w-3xl">
    <div class="flex items-center justify-center rounded-sm">
      <input
        type="text"
        v-model="searchValue"
        @input="onInput"
        :placeholder="i18n.global.t('search.title')"
        class="flex-1 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 rounded-sm text-gray-700"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { debounce } from "lodash";
import { defineEmits } from "vue";
import { DEBOUNCE_DELAY } from "@/api/config";
import i18n from "@/services/i18n";
const searchValue = ref("");
const emit = defineEmits(["search"]);
const debouncedEmit = debounce(() => {
  emit("search", searchValue.value);
}, DEBOUNCE_DELAY);
const onInput = () => {
  debouncedEmit();
};
</script>
