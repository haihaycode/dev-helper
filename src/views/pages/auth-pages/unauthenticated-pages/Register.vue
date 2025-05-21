<template>
  <div
    class="min-h-0 md:min-h-screen bg-gradient-to-br from-blue-500 to-gray-700 flex items-center justify-center p-4"
  >
    <div
      class="max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden zoomInRight"
    >
      <a-row class="min-h-[600px]">
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          class="hidden sm:flex p-8 flex-col justify-center items-center"
        >
          <div class="text-center">
            <a-image
              :src="require('@/assets/logo/DEV-HELPER.gif')"
              :alt="'DevHelper'"
              class="w-full mb-8"
              :preview="false"
            />
            <h2 class="text-white text-2xl font-bold mb-4">
              {{ $t("REGISTER_SECTION.TITLE") }}
            </h2>
            <p class="text-white font-mono text-sm">
              {{ $t("REGISTER_SECTION.DESCRIPTION") }}
            </p>
          </div>
        </a-col>

        <a-col :xs="24" :sm="24" :md="12" class="p-8 bg-white">
          <div v-if="step === 1" class="max-w-md mx-auto">
            <h1
              class="text-3xl font-bold font-mono text-blue-900 mb-8 text-center"
            >
              {{ $t("REGISTER_SECTION.TITLE") }}
            </h1>

            <a-form
              @keypress.enter="handleCheckAndSendOtp"
              @submit.prevent="handleCheckAndSendOtp"
              :model="formModel"
              class="space-y-6"
            >
              <a-form-item
                :required="true"
                :validate-status="errors.username ? 'error' : ''"
                :help="errors.username"
              >
                <a-input
                  type="text"
                  class="hover:border-blue-900 focus:border-blue-900 focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-900 border-blue-900 font-mono"
                  :class="['', { 'border-red-900 shake': errors.username }]"
                  v-model:value="formModel.username"
                  :placeholder="
                    $t('REGISTER_SECTION.USERNAME_INPUT_PLACEHOLDER')
                  "
                  size="large"
                >
                  <template #prefix>
                    <UserOutlined class="text-blue-900 text-lg" />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item
                :required="true"
                :validate-status="errors.email ? 'error' : ''"
                :help="errors.email"
              >
                <a-input
                  type="email"
                  class="hover:border-blue-900 focus:border-blue-900 focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-900 border-blue-900 font-mono"
                  :class="['', { 'border-red-900 shake': errors.email }]"
                  v-model:value="formModel.email"
                  :placeholder="$t('REGISTER_SECTION.EMAIL_INPUT_PLACEHOLDER')"
                  size="large"
                >
                  <template #prefix>
                    <MailOutlined class="text-blue-900 text-lg" />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item
                :required="true"
                :validate-status="errors.password ? 'error' : ''"
                :help="errors.password"
              >
                <a-input-password
                  class="hover:border-blue-900 focus:border-blue-900 focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-900 border-blue-900 font-mono"
                  :class="['', { 'border-red-900 shake': errors.password }]"
                  v-model:value="formModel.password"
                  :placeholder="
                    $t('REGISTER_SECTION.PASSWORD_INPUT_PLACEHOLDER')
                  "
                  size="large"
                >
                  <template #prefix>
                    <LockOutlined class="text-blue-900 text-lg" />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item
                :required="true"
                :validate-status="errors.captcha ? 'error' : ''"
                :help="errors.captcha"
                class="flex items-center space-x-2"
              >
                <a-input
                  class="hover:border-blue-900 focus:border-blue-900 focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-900 border-blue-900 font-mono flex-row"
                  :class="['', { 'border-red-900 shake': errors.captcha }]"
                  v-model:value="formModel.captcha"
                  :placeholder="$t('LOGIN_SECTION.CAPTCHA_INPUT_PLACEHOLDER')"
                  size="large"
                >
                  <template #suffix>
                    <CaptchaCode
                      v-model:captcha="captchaCode"
                      @on-change="handleCaptchaChange"
                      ref="captcha"
                      class="flex-shrink-0"
                    />
                  </template>
                </a-input>
              </a-form-item>

              <a-button
                type="primary"
                @click="handleCheckAndSendOtp"
                class="w-full h-12 rounded-sm bg-blue-900 hover:bg-gray-200 border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus:bg-blue-900"
                :loading="isLoadingPost"
              >
                {{ $t("REGISTER_SECTION.SUBMIT_BUTTON") }}
              </a-button>

              <div class="relative my-8">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-400">
                    {{ $t("REGISTER_SECTION.OR_REGISTER_WITH_TEXT") }}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <a-button
                  class="h-12 rounded-lg border-1 hover:border-blue-900 hover:text-gray-600 transition-colors duration-300"
                >
                  Google
                </a-button>
                <a-button
                  class="h-12 rounded-lg border-1 hover:border-blue-900 hover:text-gray-600 transition-colors duration-300"
                >
                  GitHub
                </a-button>
              </div>

              <div class="text-center mt-6">
                <router-link
                  :to="{ name: 'LoginPage' }"
                  class="text-blue-900 hover:text-blue-700 transition-colors"
                >
                  {{ $t("REGISTER_SECTION.LOGIN_LINK") }}
                </router-link>
              </div>
            </a-form>
          </div>
          <div v-if="step === 2">
            <a-spin :spinning="isLoadingPost" :tip="$t('LOADING.DEFAULT')">
              <div
                class="text-center mt-8 bg-white p-8 rounded-sm bg-opacity-80"
              >
                <h1 class="text-3xl font-bold text-blue-900 mb-4">
                  {{ $t("REGISTER_SECTION.OTP_TITLE") }}
                </h1>
                <p class="text-gray-700 text-lg mb-6">
                  {{ $t("REGISTER_SECTION.OTP_DESCRIPTION") }}
                </p>
                <AntOtp @otpEntered="handleCheckOtpAndRegister" />
                <div class="flex justify-center gap-4 px-8 mt-8">
                  <span
                    @click="
                      () => {
                        countDown > 0 ? null : handleResendOtp();
                      }
                    "
                    :disabled="countDown > 0"
                    class="cursor-pointer text-blue-900 hover:text-blue-700 transition-colors duration-300"
                  >
                    {{
                      countDown <= 0
                        ? $t("REGISTER_SECTION.OTP_RESEND")
                        : $t("OTP_SECTION.OTP_COUNT_DOWN") +
                          " " +
                          countDown +
                          "s"
                    }}
                  </span>
                </div>
                <p
                  @click="
                    () => {
                      step = 1;
                    }
                  "
                  class="text-blue-900 text-sm mb-6 mt-2 cursor-pointer underline"
                >
                  {{ $t("BACK.TITLE") }}
                </p>
              </div>
            </a-spin>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "UserRegisterPage",
};
</script>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import AntOtp from "@/components/container/AntOtp.vue";
import CaptchaCode from "vue-captcha-code";
import { useStore } from "vuex";
import { sendOtp, registerUser } from "@/api/userApi";
import { DEV } from "@/api/config";
import { Otp, UserResponse } from "@/models/user";
import { encryptWithSecretKey } from "@/utils/uniqueIdUtils";
import * as yup from "yup";

const { t } = useI18n();
const captchaCode = ref("");
const formModel = ref({
  username: "",
  email: "",
  password: "",
  captcha: "",
});
const errors = ref<Record<string, string>>({});
const step = ref(1);
const countDown = ref(0);
const store = useStore();
const isLoadingPost = computed(() => store.getters["loading/isLoadingPost"]);
const schema = yup.object().shape({
  username: yup.string().required(t("REGISTER_SECTION.ERROR_MESSAGE")),
  email: yup
    .string()
    .email(t("REGISTER_SECTION.INVALID_EMAIL"))
    .required(t("REGISTER_SECTION.ERROR_MESSAGE")),
  password: yup.string().required(t("REGISTER_SECTION.ERROR_MESSAGE")),
  captcha: yup.string().required(t("LOGIN_SECTION.CAPTCHA_ERROR_MESSAGE")),
});
const DataResponse = ref<Otp | null>(null);
const handleCaptchaChange = (code: string) => {
  captchaCode.value = code;
};
const handleCountDown = () => {
  countDown.value = DEV ? 60 : 120;
  const interval = setInterval(() => {
    countDown.value--;
    if (countDown.value === 0) {
      clearInterval(interval);
      return;
    }
  }, 1000);
};
const handleResendOtp = async () => {
  const res = await sendOtp(formModel.value.email);
  if (!DataResponse.value) {
    DataResponse.value = { otp: "", email: "" };
  }
  DataResponse.value.otp = res.data?.otp || "";
  DataResponse.value.email = res.data?.email || "";

  notification.success({
    message: res.message || "",
    description: t("REGISTER_SECTION.OTP_SENT_DESCRIPTION"),
    placement: "bottomRight",
  });
  handleCountDown();
};

//check step 1 : validate form and send otp
const handleCheckAndSendOtp = async () => {
  try {
    await schema.validate(formModel.value, { abortEarly: false });
    if (formModel.value.captcha !== captchaCode.value) {
      errors.value.captcha = t("LOGIN_SECTION.CAPTCHA_MISMATCH_ERROR");
      return;
    }
    if (countDown.value <= 0) {
      const res = await sendOtp(formModel.value.email);
      if (!DataResponse.value) {
        DataResponse.value = { otp: "", email: "" };
      }
      DataResponse.value.otp = res.data?.otp || "";
      DataResponse.value.email = res.data?.email || "";

      notification.success({
        message: res.message || "",
        description: t("REGISTER_SECTION.OTP_SENT_DESCRIPTION"),
        placement: "bottomRight",
      });
      handleCountDown();
    }
    step.value = 2;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errorMessages: Record<string, string> = {};
      err.inner.forEach((error) => {
        if (error.path) {
          errorMessages[error.path] = error.message;
        }
      });
      errors.value = errorMessages;
    }
  } finally {
    handleCaptchaChange(captchaCode.value);
  }
};
//step 2 : check otp and register
const handleCheckOtpAndRegister = async (otp: string) => {
  console.log(otp);
  console.log(DataResponse.value?.otp);
  let message = null;
  if (DataResponse.value?.email !== formModel.value.email) {
    message = t("REGISTER_SECTION.EMAIL_MISMATCH");
    notification.error({
      message: message,
      description: t("REGISTER_SECTION.EMAIL_MISMATCH_DESCRIPTION"),
      placement: "bottomRight",
    });
    step.value = 1;
    countDown.value = 0;
    return;
  }
  if (encryptWithSecretKey(otp, "secretKey") !== DataResponse.value?.otp) {
    message = t("REGISTER_SECTION.OTP_MISMATCH");
    notification.error({
      message: message,
      description: t("REGISTER_SECTION.OTP_MISMATCH_DESCRIPTION"),
      placement: "bottomRight",
    });
    return;
  }
  //TODO: register call api
  try {
    const res: UserResponse = await registerUser(
      formModel.value.username,
      formModel.value.password,
      formModel.value.email
    );
    notification.success({
      message: res.message || "",
      description: t("REGISTER_SECTION.SUCCESS_MESSAGE"),
      placement: "bottomRight",
    });
  } catch (error) {
    console.log(error);
  }
};
</script>
