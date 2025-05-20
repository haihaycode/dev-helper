<template>
  <div>
    <!-- PC UI -->
    <div
      class="relative rounded-t-xl shadow-sm overflow-hidden hidden sm:block"
    >
      <a-range-picker
        v-model:value="dateRange"
        :locale="currentLocale"
        :placeholder="[
          i18n.global.t('date.startDate'),
          i18n.global.t('date.endDate'),
        ]"
        :bordered="false"
        class="w-full text-gray-700"
        @change="handleDateChange"
      />
    </div>

    <!-- Mobile UI -->
    <div class="block sm:hidden">
      <button
        @click="isModalOpen = true"
        class="w-full py-2 px-3 border rounded text-left bg-white shadow-sm text-gray-700"
      >
        {{ displayDateRange }}
      </button>
    </div>

    <a-modal
      v-model:visible="isModalOpen"
      title="Chọn ngày"
      :footer="null"
      :closable="true"
      centered
      :body-style="{ padding: '16px' }"
      width="100vw"
      class="custom-date-modal"
    >
      <a-range-picker
        v-model:value="mobileDateRange"
        :locale="currentLocale"
        class="w-full"
        @change="handleMobileDateChange"
      />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, computed, watch } from "vue";
import { Dayjs } from "dayjs";
import i18n from "@/services/i18n";
import "dayjs/locale/vi";
import "dayjs/locale/en";
import localeVi from "ant-design-vue/es/date-picker/locale/vi_VN";
import localeEn from "ant-design-vue/es/date-picker/locale/en_US";
import { getLocale } from "@/utils/global";

const dateRange = ref<[Dayjs, Dayjs] | null>(null);
const mobileDateRange = ref<[Dayjs, Dayjs] | null>(null);
const isModalOpen = ref(false);

const currentLocale = computed(() =>
  getLocale() === "vi" ? localeVi : localeEn
);

const emit = defineEmits<{
  (e: "dateChange", startDate: string, endDate: string): void;
}>();

const handleDateChange = (dates: [Dayjs, Dayjs] | null) => {
  if (!dates || !dates[0] || !dates[1]) {
    emit("dateChange", "", "");
    return;
  }
  const [start, end] = dates;
  emit("dateChange", start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"));
};

const handleMobileDateChange = (dates: [Dayjs, Dayjs] | null) => {
  mobileDateRange.value = dates;
  isModalOpen.value = false;
  dateRange.value = dates;
  handleDateChange(dates);
};

const displayDateRange = computed(() => {
  if (!dateRange.value || !dateRange.value[0] || !dateRange.value[1]) {
    return (
      i18n.global.t("date.startDate") + " - " + i18n.global.t("date.endDate")
    );
  }
  const [start, end] = dateRange.value;
  return `${start.format("DD/MM/YYYY")} - ${end.format("DD/MM/YYYY")}`;
});
</script>

<style scoped>
:deep(.custom-date-modal .ant-modal) {
  max-width: 100vw !important;
  top: 0 !important;
  height: 100vh !important;
  margin: 0;
  padding: 0;
}

:deep(.custom-date-modal .ant-modal-content) {
  height: 100vh !important;
  border-radius: 0 !important;
  padding: 0;
}
</style>
