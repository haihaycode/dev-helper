<template>
  <div id="searchFilter" class="w-full max-w-xl">
    <div class="relative rounded-xl shadow-sm overflow-hidden">
      <input
        type="text"
        v-model="searchValue"
        @input="onInput"
        :placeholder="i18n.global.t('search.title')"
        class="w-full px-4 py-2 pr-10 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
      />
      <CloseOutlined
        v-if="searchValue"
        @click="clearSearch"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer text-lg"
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
import { CloseOutlined } from "@ant-design/icons-vue";
const searchValue = ref("");
const emit = defineEmits(["search"]);
const debouncedEmit = debounce(() => {
  emit("search", searchValue.value);
}, DEBOUNCE_DELAY);
const onInput = () => {
  debouncedEmit();
};
const clearSearch = () => {
  searchValue.value = "";
  debouncedEmit();
};
</script>
