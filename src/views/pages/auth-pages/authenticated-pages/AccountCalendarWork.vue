<template>
  <AccountPagePatternLayout :title="$t('nav.account.calendarWork')">
    <template #content>
      <div id="calendar">
        <a-calendar :locale="locale">
          <template #monthCellRender="{ current }">
            <div class="notes-month">
              <section>{{ current }}</section>
              <span>Backlog number</span>
            </div>
          </template>
        </a-calendar>
      </div>
    </template>
  </AccountPagePatternLayout>
</template>
<script setup lang="ts">
import AccountPagePatternLayout from "./AccountPagePatternLayout.vue";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const locale = computed(() => store.getters["locale/locale"]);
console.log(locale);


</script>
