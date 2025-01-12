<template>
  <div
    class="min-h-screen bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center p-4"
  >
    <div class="max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden">
      <a-row class="min-h-[600px]">
        <!-- Left side - Logo & Branding -->
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          class="p-8 flex flex-col justify-center items-center"
        >
          <div class="text-center">
            <a-image
              :src="require('@/assets/logo/DEV-HELPER.gif')"
              :alt="'DevHelper'"
              class="w-full mb-8"
              :preview="false"
            />
            <h2 class="text-white text-2xl font-bold mb-4">
              {{ $t("register.title") }}
            </h2>
            <p class="text-white font-mono text-sm">
              {{ $t("register.description") }}
            </p>
          </div>
        </a-col>

        <!-- Right side - Register Form -->
        <a-col :xs="24" :sm="24" :md="12" class="p-8 bg-white">
          <div v-if="step === 1" class="max-w-md mx-auto">
            <h1
              class="text-3xl font-bold font-mono text-amber-800 mb-8 text-center"
            >
              {{ $t("register.title") }}
            </h1>

            <a-form
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
                  class="hover:border-amber-600 focus:border-amber-600 focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700 font-mono"
                  v-model:value="formModel.username"
                  :placeholder="$t('register.usernamePlaceholder')"
                  size="large"
                >
                  <template #prefix>
                    <UserOutlined class="text-amber-600 text-lg" />
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
                  class="hover:border-amber-600 focus:border-amber-600 focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700 font-mono"
                  v-model:value="formModel.email"
                  :placeholder="$t('register.emailPlaceholder')"
                  size="large"
                >
                  <template #prefix>
                    <MailOutlined class="text-amber-600 text-lg" />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item
                :required="true"
                :validate-status="errors.password ? 'error' : ''"
                :help="errors.password"
              >
                <a-input-password
                  class="hover:border-amber-600 focus:border-amber-600 focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700 font-mono"
                  v-model:value="formModel.password"
                  :placeholder="$t('register.passwordPlaceholder')"
                  size="large"
                >
                  <template #prefix>
                    <LockOutlined class="text-amber-600 text-lg" />
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
                  class="flex-grow hover:border-amber-600 focus:border-amber-600 focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700 font-mono"
                  v-model:value="formModel.captcha"
                  :placeholder="$t('login.captchaPlaceholder')"
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
                class="w-full h-12 rounded-sm bg-amber-600 hover:bg-amber-700 border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700"
                :loading="isLoadingPost"
              >
                {{ $t("register.submitButton") }}
              </a-button>

              <div class="relative my-8">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">
                    {{ $t("register.orRegisterWith") }}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <a-button
                  class="h-12 rounded-lg border-2 hover:border-amber-500 hover:text-amber-600 transition-colors duration-300"
                >
                  Google
                </a-button>
                <a-button
                  class="h-12 rounded-lg border-2 hover:border-amber-500 hover:text-amber-600 transition-colors duration-300"
                >
                  GitHub
                </a-button>
              </div>

              <div class="text-center mt-6">
                <router-link
                  :to="{ name: 'LoginPage' }"
                  class="text-amber-600 hover:text-amber-700 transition-colors"
                >
                  {{ $t("register.loginLink") }}
                </router-link>
              </div>
            </a-form>
          </div>
          <div v-if="step === 2">
            <div class="text-center mt-8 bg-white p-8 rounded-sm bg-opacity-80">
              <h1 class="text-3xl font-bold text-amber-600 mb-4">
                {{ $t("register.otpTitle") }}
              </h1>
              <p class="text-gray-700 text-lg mb-6">
                {{ $t("register.otpDescription") }}
              </p>
              <AntOtp @otpEntered="handleCheckOtpAndRegister" />
              <div class="flex justify-center gap-4 px-8 mt-8">
                <a-button
                  @click="handleResendOtp"
                  :loading="isLoadingPost"
                  :disabled="countDown > 0"
                  type="primary"
                  class="w-full h-12 rounded-sm bg-amber-600 hover:bg-amber-700 border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700"
                >
                  {{ countDown <= 0 ? $t("register.optResend") : countDown }}
                </a-button>
                <a-button
                  @click="handleCheckOtpAndRegister"
                  :loading="isLoadingPost"
                  type="primary"
                  class="w-full h-12 rounded-sm bg-amber-600 hover:bg-amber-700 border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700"
                >
                  {{ $t("register.otpSubmitButton") }}
                </a-button>
              </div>
              <p
                @click="
                  () => {
                    step = 1;
                  }
                "
                class="text-amber-600 text-sm mb-6 mt-2 cursor-pointer underline"
              >
                {{ $t("back.title") }}
              </p>
            </div>
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
// import { useRouter } from "vue-router";
import * as yup from "yup";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import AntOtp from "@/components/container/AntOtp.vue";
import CaptchaCode from "vue-captcha-code";
import { useStore } from "vuex";
import { sendOtp } from "@/api/userApi";
import { DEV } from "@/api/config";
import { Otp } from "@/models/user";

const { t } = useI18n();
// const router = useRouter();
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
  username: yup.string().required(t("register.errorMessage")),
  email: yup
    .string()
    .email(t("register.invalidEmail"))
    .required(t("register.errorMessage")),
  password: yup.string().required(t("register.errorMessage")),
  captcha: yup.string().required(t("login.captchaError")),
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
    description: t("register.otpSentDescription"),
    placement: "bottomRight",
  });
  handleCountDown();
};

//check step 1 : validate form and send otp
const handleCheckAndSendOtp = async () => {
  try {
    await schema.validate(formModel.value, { abortEarly: false });
    if (formModel.value.captcha !== captchaCode.value) {
      errors.value.captcha = t("login.captchaMismatch");
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
        description: t("register.otpSentDescription"),
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
  let message = null;
  if (DataResponse.value?.email !== formModel.value.email) {
    message = t("register.emailMismatch");
    notification.error({
      message: message,
      description: t("register.emailMismatchDescription"),
      placement: "bottomRight",
    });
    step.value = 1;
    countDown.value = 0;
    return;
  }
  if (otp !== DataResponse.value?.otp) {
    message = t("register.otpMismatch");
    notification.error({
      message: message,
      description: t("register.otpMismatchDescription"),
      placement: "bottomRight",
    });
    return;
  }
  console.log(otp);
  console.log(DataResponse.value?.otp);
  //TODO: register call api
};
</script>
