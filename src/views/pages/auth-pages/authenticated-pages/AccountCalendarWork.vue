<template>
  <AccountPagePatternLayout :title="$t('nav.account.calendarWork')">
    <template #content>
      <div id="calendar">
        <a-calendar :locale="locale">
          <template #monthCellRender="{ current }">
            <div class="notes-month">
              <section>{{ current }}</section>
              <span>{{ i18n.global.t("ACCOUNT_SECTION.BACKLOG_NUMBER") }}</span>
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
import i18n from "@/services/i18n";
const store = useStore();
const locale = computed(() => store.getters["locale/locale"]);
</script>
