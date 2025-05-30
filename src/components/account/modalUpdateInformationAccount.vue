<template>
  <AntModal :visible="isVisible" @cancel="closeModal">
    <template #title>
      <h1 class="text-xl text-left font-mono font-bold text-blue-900">
        {{
          i18n.global.t(
            "NAVIGATION_MENU.ACCOUNT_SECTION.PROFILE.UPDATE_INFORMATION"
          )
        }}
      </h1>
    </template>

    <template #default>
      <a-form
        @submit="handleUpdateInformationProfile"
        :model="formModelInformationProfile"
        :rules="rules"
      >
        <a-form-item
          name="fullName"
          :rules="rules.fullName"
          :validate-status="errors.fullName ? 'error' : ''"
          :help="errors.fullName"
        >
          <p class="text-blue-900 font-mono font-bold">
            {{ i18n.global.t("NAVIGATION_MENU.ACCOUNT_SECTION.PROFILE.NAME") }}
            <span v-if="rules.fullName[0].required" class="text-red-500"
              >*</span
            >
          </p>
          <a-input
            placeholder="..."
            class="border-blue-900 focus:border-blue-700 hover:border-blue-700"
            v-model="formModelInformationProfile.fullName"
          />
        </a-form-item>
        <a-form-item name="nickname">
          <p class="text-blue-900 font-mono font-bold">
            {{
              i18n.global.t("NAVIGATION_MENU.ACCOUNT_SECTION.PROFILE.NICKNAME")
            }}
          </p>
          <a-input
            placeholder="..."
            class="border-blue-900 focus:border-blue-700 hover:border-blue-700"
            v-model="formModelInformationProfile.nickname"
          />
        </a-form-item>
        <a-form-item name="hobbies">
          <p class="text-blue-900 font-mono font-bold">
            {{
              i18n.global.t("NAVIGATION_MENU.ACCOUNT_SECTION.PROFILE.HOBBIES")
            }}
          </p>
          <a-input
            placeholder="..."
            class="border-blue-900 focus:border-blue-700 hover:border-blue-700"
            v-model="formModelInformationProfile.hobbies"
          />
        </a-form-item>
        <a-form-item name="address">
          <p class="text-blue-900 font-mono font-bold">
            {{
              i18n.global.t("NAVIGATION_MENU.ACCOUNT_SECTION.PROFILE.ADDRESS")
            }}
          </p>
          <a-textarea
            placeholder="..."
            rows="2"
            class="border-blue-900 focus:border-blue-700 hover:border-blue-700"
            v-model="formModelInformationProfile.address"
          />
        </a-form-item>
        <a-form-item
          name="dob"
          :rules="rules.dob"
          :validate-status="errors.dob ? 'error' : ''"
          :help="errors.dob"
        >
          <p class="text-blue-900 font-mono font-bold">
            {{ i18n.global.t("NAVIGATION_MENU.ACCOUNT_SECTION.PROFILE.DOB") }}
          </p>
          <a-date-picker
            format="DD/MM/YYYY"
            default-value="2000-01-01"
            placeholder="..."
            class="border-blue-900 focus:border-blue-700 hover:border-blue-700 w-full hover:cursor-pointer"
            v-model="formModelInformationProfile.dob"
          />
        </a-form-item>
      </a-form>
    </template>
    <template #footer>
      <Button
        @click="closeModal"
        class="text-blue-900 hover:text-blue-700 border-blue-900 hover:border-blue-700"
      >
        {{ i18n.global.t("NAVIGATION_MENU.ACCOUNT_SECTION.PROFILE.CANCEL") }}
      </Button>
      <Button
        type="primary"
        class="text-white bg-blue-900 hover:bg-blue-700 focus:bg-blue-900"
        @click="handleUpdateInformationProfile"
      >
        {{
          i18n.global.t(
            "NAVIGATION_MENU.ACCOUNT_SECTION.PROFILE.UPDATE_INFORMATION"
          )
        }}
      </Button>
    </template>
  </AntModal>
</template>
<script setup lang="ts">
import { Modal as AntModal, Button } from "ant-design-vue";
import * as yup from "yup";
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
import { IInformationProfile } from "@/models/IInformationProfile";
import i18n from "@/services/i18n";
defineProps<{
  user: IInformationProfile | null;
  isVisible: boolean | false;
}>();

// Validate form information profile
const formModelInformationProfile = ref<IInformationProfile>({
  email: "",
  username: "",
  bio: "",
  fullName: "",
  address: "",
  phone: "",
  dob: "",
  nickname: "",
  hobbies: "",
  createdTime: "",
  updatedTime: "",
  avatar: "",
  linkGithub: "",
  linkFacebook: "",
  linkInstagram: "",
  linkTwitter: "",
});

const errors = ref<Record<string, string>>({});
const schema = yup.object().shape({
  fullName: yup.string().required(),
  username: yup.string().required(),
});

const rules = ref({
  fullName: [
    {
      required: true,
      message: i18n.global.t(
        "NAVIGATION_MENU.ACCOUNT_SECTION.PROFILE.VALIDATE.FULL_NAME"
      ),
    },
  ],
  username: [
    {
      required: true,
      message: i18n.global.t(
        "NAVIGATION_MENU.ACCOUNT_SECTION.PROFILE.VALIDATE.USERNAME"
      ),
    },
  ],
  dob: [
    {
      required: false,
    },
  ],
});

const handleUpdateInformationProfile = async () => {
  try {
    await schema.validate(formModelInformationProfile.value, {
      abortEarly: false,
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errorMessages: Record<string, string> = {};
      err.inner.forEach((error) => {
        if (error.path) {
          const rule = rules.value[error.path as keyof typeof rules.value][0];
          if (rule && "message" in rule) {
            errorMessages[error.path as keyof typeof rules.value] =
              rule.message;
          }
        }
      });
      errors.value = errorMessages;
    }
  }
};

// Action
const emit = defineEmits(["update:isVisible"]);
const closeModal = () => {
  emit("update:isVisible", false);
};
</script>
