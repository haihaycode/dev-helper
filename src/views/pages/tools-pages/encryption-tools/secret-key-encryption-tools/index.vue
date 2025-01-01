<template>
  <div class="main min-h-[100vh] sm:p-2 md:p-4 lg:p-6 xl:p-8">
    <Breadcrumb :items="breadcrumbItems" />
    <a-transition name="fade" mode="out-in">
      <div class="title mt-2 px-2" v-if="tool">
        <a-typography-title
          :level="3"
          class="text-center flex flex-col items-center md:flex-row md:text-left"
        >
          {{ $t(tool.name) }} &nbsp;
          <a-badge
            :color="toolType?.color || ''"
            :text="$t(toolType?.name || '')"
          />
        </a-typography-title>

        <a-typography-paragraph
          class="hidden sm:block"
          style="text-align: left"
        >
          {{ $t(tool.description) }}
        </a-typography-paragraph>
        <a-typography-paragraph
          class="sm:hidden block"
          style="text-align: left"
        >
          {{ truncateString($t(tool.description), 200) }}
        </a-typography-paragraph>
      </div>
      <div class="content mt-2 px-2" v-if="tool">
        <a-form layout="vertical">
          <a-form-item label="Chọn loại mã hóa:">
            <a-radio-group v-model:value="encryptionType">
              <a-radio value="reverse">Đảo lộn text</a-radio>
              <a-radio value="icon">Mã hóa kiểu icon</a-radio>
              <a-radio value="bcrypt">Mã hóa kiểu bcrypt</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Nhập secret key:">
            <a-input prefix="🔑" suffix="secretKey" v-model:value="secretKey" />
          </a-form-item>
          <a-form-item label="Nhập text cần mã hóa:">
            <a-textarea
              v-model:value="inputText"
              allow-clear
              :maxlength="100"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="encrypt">Mã hóa</a-button>
          </a-form-item>
          <a-form-item label="Kết quả mã hóa:">
            <a-typography-paragraph copyable :content="outputText">
              <template #copyableIcon="{ copied }">
                <SmileOutlined v-if="!copied" key="copy-icon" />
                <SmileFilled v-else key="copied-icon" />
              </template>
              <template #copyableTooltip="{ copied }">
                <span v-if="!copied" key="copy-tooltip">click here</span>
                <span v-else key="copied-tooltip">you clicked!!</span>
              </template>
            </a-typography-paragraph>
          </a-form-item>
        </a-form>
      </div>
    </a-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import Breadcrumb from "@/components/container/Breadcrumb.vue";
import { getToolTypeById, getToolById } from "@/services/tools/toolsService";
import { useI18n } from "vue-i18n";
import { truncateString } from "@/utils/StringUtils";
import { encryptText } from "./encryptionUtils";

export default defineComponent({
  name: "SecretKeyEncryptionToolsPage",
  components: {
    Breadcrumb,
  },
  setup() {
    const { t } = useI18n();
    const toolId = "1";
    const tool = getToolById(toolId);
    const toolTypeId = tool?.idtoolsType || "";
    const toolType = getToolTypeById(toolTypeId);

    const breadcrumbItems = computed(() => [
      { href: "/", text: "Home", path: "homePage" },
      { href: `/t/tools`, text: toolType?.name, path: "toolsIndex" },
      { text: tool?.name },
    ]);

    const encryptionType = ref("reverse");
    const secretKey = ref("");
    const inputText = ref("");
    const outputText = ref("");

    const encrypt = () => {
      outputText.value = encryptText(
        encryptionType.value,
        inputText.value,
        secretKey.value
      );
    };

    return {
      t,
      tool,
      toolType,
      breadcrumbItems,
      truncateString,
      encryptionType,
      secretKey,
      inputText,
      outputText,
      encrypt,
    };
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
