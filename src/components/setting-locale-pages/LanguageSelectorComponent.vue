<template>
  <div>
    <a-button
      v-if="!showModal"
      shape="circle"
      class="fixed bottom-4 right-4 z-50 bg-yellow-500 hover:bg-white text-white hover:text-yellow-500 focus:outline-none"
      @click="showModal = true"
    >
      {{ selectedLanguage }}</a-button
    >
    <a-modal
      :title="t('translation.selectLanguage')"
      :visible="showModal"
      @ok="handleOk"
      @cancel="handleCancel"
      :footer="null"
    >
      <a-radio-group
        class="flex flex-col space-y-2"
        v-model="selectedLanguage"
        @change="changeLanguage"
      >
        <a-radio-button
          v-for="(lang, key) in languages"
          :key="key"
          :value="key"
          class="block mb-2 hover:text-yellow-500"
          :class="{
            'bg-gray-500 text-white ': selectedLanguage === key,
          }"
        >
          {{ lang }}
        </a-radio-button>
      </a-radio-group>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

export default defineComponent({
  name: "LanguageSelectorComponent",
  setup() {
    const { t, locale } = useI18n();
    const store = useStore();
    const showModal = ref(false);
    const selectedLanguage = computed(() => store.getters["locale/locale"]);

    const languages = {
      en: t("translation.en"),
      vi: t("translation.vi"),
    };

    const changeLanguage = (e: Event) => {
      const newLocale = (e.target as HTMLInputElement).value;
      store.dispatch("locale/setLocale", newLocale);
      locale.value = newLocale;
      showModal.value = false;
      window.location.reload();
    };

    const handleOk = () => {
      showModal.value = false;
    };

    const handleCancel = () => {
      showModal.value = false;
    };

    return {
      t,
      showModal,
      selectedLanguage,
      languages,
      changeLanguage,
      handleOk,
      handleCancel,
    };
  },
});
</script>
