<template>
  <div class="main min-h-[100vh] sm:p-2 md:p-4 lg:p-6 xl:p-8">
    <Breadcrumb :items="breadcrumbItems" />
    <a-transition name="fade" mode="out-in">
      <div class="title mt-2 sm:mt-2 px-2" v-if="tool">
        <a-typography-title :level="3" class="text-center">
          {{ $t(tool.name) }} &nbsp;
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
      <div class="content mt-4 px-2 sm:mt-2" v-if="tool">
        <a-form layout="vertical">
          <a-form-item>
            <a-radio-group v-model:value="encryptionType">
              <a-radio value="reverse">Reverse Text</a-radio>
              <a-radio value="icon">Icon Encryption</a-radio>
              <a-radio value="bcrypt">Bcrypt Encryption</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item>
            <a-input
              suffix="Secret Key"
              class="text-left"
              v-model:value="secretKey"
              aria-required="true"
              required
            >
              <template #prefix>
                <KeyOutlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <template #label>
              <a-typography-paragraph
                >Enter the text to be encrypted</a-typography-paragraph
              >
              &nbsp;
              <EnterOutlined />
            </template>
            <a-textarea
              class="text-left bg-white bg-opacity-30 min-h-56 p-2 sm:p-4"
              v-model:value="inputText"
              :auto-size="{ minRows: 10, maxRows: 100 }"
              allow-clear
            />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              :disabled="!inputText || !secretKey"
              @click="encrypt"
            >
              Encrypt
            </a-button>
          </a-form-item>
          <a-form-item>
            <a-typography-paragraph
              v-if="outputText"
              class="text-left bg-white bg-opacity-30 min-h-56 p-2 sm:p-4"
              copyable
            >
              {{ outputText }}
              <template #copyableIcon="{ copied }">
                <CopyOutlined v-if="!copied" key="copy-icon" />
                <CodeFilled v-else key="copied-icon" />
              </template>
              <template #copyableTooltip="{ copied }">
                <span v-if="!copied" key="copy-tooltip">Copy code</span>
                <span v-else key="copied-tooltip">Code copied</span>
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
import {
  KeyOutlined,
  EnterOutlined,
  CopyOutlined,
  CodeFilled,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "SecretKeyEncryptionToolsPage",
  components: {
    Breadcrumb,
    KeyOutlined,
    EnterOutlined,
    CodeFilled,
    CopyOutlined,
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
.ant-typography {
  margin-bottom: 0px;
}
</style>
