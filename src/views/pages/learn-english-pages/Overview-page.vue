<template>
  <LearnEnglishPagePatternLayout
    :title="
      $t('NAVIGATION_MENU.LANGUAGE_LEARNING_SECTION.ENGLISH_SUBMENU.OVERVIEW')
    "
  >
    <template #content>
      <div id="overview">
        <h1 class="">overview</h1>
      </div>
    </template>
  </LearnEnglishPagePatternLayout>
</template>
<script setup lang="ts">
import LearnEnglishPagePatternLayout from "./LearnEnglishPagePatternLayout.vue";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const locale = computed(() => store.getters["locale/locale"]);
console.log(locale);
</script>
