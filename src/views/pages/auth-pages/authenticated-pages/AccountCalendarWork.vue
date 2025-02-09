<template>
  <AccountPagePatternLayout :title="$t('nav.account.calendarWork')">
    <template #content>
      <div id="calendar">
        <a-calendar>
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
</script>
