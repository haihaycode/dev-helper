<template>
  <div class="">
    <div class="relative rounded-t-xl shadow-sm overflow-hidden">
      <a-range-picker
        v-model:value="dateRange"
        :locale="currentLocale"
        :placeholder="[
          i18n.global.t('date.startDate'),
          i18n.global.t('date.endDate'),
        ]"
        :bordered="false"
        class="w-full text-gray-700 hover:border-none"
        @change="handleDateChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, computed } from "vue";
import { Dayjs } from "dayjs";
import i18n from "@/services/i18n";
import "dayjs/locale/vi";
import "dayjs/locale/en";
import localeVi from "ant-design-vue/es/date-picker/locale/vi_VN";
import localeEn from "ant-design-vue/es/date-picker/locale/en_US";
import { getLocale } from "@/utils/global";

const dateRange = ref<[Dayjs, Dayjs] | null>(null);

const currentLocale = computed(() => {
  return getLocale() === "vi" ? localeVi : localeEn;
});

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
</script>

<style scoped>
:deep(.ant-picker),
:deep(.ant-picker-input),
:deep(.ant-picker-input input) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.ant-picker-focused) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.ant-picker:hover) {
  border: none !important;
}
</style>
