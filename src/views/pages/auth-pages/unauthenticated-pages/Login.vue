Bạn muốn cập nhật component này để sử dụng các key i18n mới từ file JSON bạn đã
cung cấp trước đó, đúng không? Dưới đây là phiên bản đã được cập nhật:
TypeScript

<template>
  <div
    class="md:min-h-screen bg-gradient-to-br from-blue-500 to-gray-800 flex items-center justify-center p-4"
  >
    <div
      class="max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden"
      :class="animation"
    >
      <a-row class="min-h-[600px]">
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          class="hidden sm:flex p-8 flex-col justify-center items-center jello-horizontal"
        >
          <div class="text-center">
            <a-image
              :src="require('@/assets/logo/DEV-HELPER.gif')"
              :alt="'DevHelper'"
              class="w-full mb-8"
              :preview="false"
            />
            <h2
              class="text-white text-2xl font-bold mb-4 scroll-animate fade-up"
            >
              {{ $t("LOGIN_SECTION.WELCOME_MESSAGE") }}
            </h2>
            <p class="text-white font-mono text-sm scroll-animate fade-up">
              {{ $t("REGISTER_SECTION.DESCRIPTION") }}
            </p>
          </div>
        </a-col>

        <a-col :xs="24" :sm="24" :md="12" class="p-8 bg-white">
          <div class="max-w-md mx-auto">
            <h1
              class="text-3xl font-bold font-mono text-blue-900 mb-8 text-center scroll-animate fade-up"
            >
              {{ $t("LOGIN_SECTION.TITLE") }}
            </h1>

            <a-form
              @submit.prevent="handleLogin"
              @keyup.enter="handleLogin"
              :model="formModel"
              class="space-y-6"
            >
              <a-form-item
                :required="true"
                :validate-status="errors.username ? 'error' : ''"
                :help="errors.username"
              >
                <a-input
                  class="hover:border-blue-900 focus:border-blue-900 focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-900 border-blue-900 font-mono"
                  :class="['', { 'border-red-700 shake': errors.username }]"
                  v-model:value="formModel.username"
                  :placeholder="$t('LOGIN_SECTION.USERNAME_INPUT_PLACEHOLDER')"
                  size="large"
                >
                  <template #prefix>
                    <UserOutlined class="text-blue-700 text-lg" />
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
                  :class="['', { 'border-red-700 shake': errors.password }]"
                  v-model:value="formModel.password"
                  :placeholder="$t('LOGIN_SECTION.PASSWORD_INPUT_PLACEHOLDER')"
                  size="large"
                >
                  <template #prefix>
                    <LockOutlined class="text-blue-700 text-lg" />
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
                  class="hover:border-blue-900 focus:border-blue-900 focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-900 border-blue-900 font-mono"
                  v-model:value="formModel.captcha"
                  :placeholder="$t('LOGIN_SECTION.CAPTCHA_INPUT_PLACEHOLDER')"
                  size="large"
                >
                  <template #suffix>
                    <CaptchaCode
                      v-model:captcha="captchaCode"
                      :class="['', { 'border-red-500 shake': errors.captcha }]"
                      @on-change="handleCaptchaChange"
                      ref="captcha"
                      class="flex-shrink-0"
                    />
                  </template>
                </a-input>
              </a-form-item>

              <a-button
                type="primary"
                @click="handleLogin"
                class="w-full h-12 rounded-sm bg-blue-900 hover:bg-gray-200 border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus:bg-blue-700"
                :loading="isLoadingPost"
              >
                {{ $t("LOGIN_SECTION.SUBMIT_BUTTON") }}
              </a-button>

              <div class="relative my-8">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span
                    class="px-2 bg-white text-gray-500 scroll-animate fade-up"
                  >
                    {{ $t("LOGIN_SECTION.OR_LOGIN_WITH_TEXT") }}
                  </span>
                </div>
              </div>

              <div class="text-center mt-6">
                <router-link
                  @click="animation = 'bounceOut'"
                  :to="{ name: 'RegisterPage' }"
                  class="text-blue-700 hover:text-blue-400 transition-colors scroll-animate fade-up"
                >
                  {{ $t("LOGIN_SECTION.REGISTER_LINK") }}
                </router-link>
              </div>
            </a-form>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "UserLoginPage",
};
</script>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import * as yup from "yup";
import { loginUser } from "@/api/userApi";
import { useStore } from "vuex";
import { UserResponse } from "@/models/user";
import { notification } from "ant-design-vue";
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue";
import CaptchaCode from "vue-captcha-code";
import { useRouter } from "vue-router";
import { getPreviousRoute } from "@/utils/routeUtils";
import { DEV } from "@/api/config";

const { t } = useI18n();
const store = useStore();
const router = useRouter();
const isLoadingPost = computed(() => store.getters["loading/isLoadingPost"]);
const formModel = ref({
  username: DEV ? "haihaycode" : "",
  password: DEV ? "123456" : "",
  captcha: "",
});
const user = ref<UserResponse | null>(null);
const captchaCode = ref("");
const animation = ref("zoomInLeft");

const errors = ref<Record<string, string>>({});
const schema = yup.object().shape({
  username: yup.string().required(t("LOGIN_SECTION.ERROR_MESSAGE")),
  password: yup.string().required(t("LOGIN_SECTION.ERROR_MESSAGE")),
  captcha: yup.string().required(t("LOGIN_SECTION.CAPTCHA_ERROR_MESSAGE")),
});
const handleCaptchaChange = (code: string) => {
  captchaCode.value = code;
};
const handleLogin = async () => {
  try {
    errors.value = {};
    await schema.validate(formModel.value, { abortEarly: false });
    if (formModel.value.captcha !== captchaCode.value) {
      errors.value.captcha = t("LOGIN_SECTION.CAPTCHA_MISMATCH_ERROR");
      return;
    }
    const userResponse: UserResponse = await loginUser(
      formModel.value.username,
      formModel.value.password
    );

    user.value = userResponse;
    if (userResponse.data) {
      store.dispatch("auth/setToken", userResponse.data.accessToken);
      store.dispatch("auth/setRefreshToken", userResponse.data.refreshToken);
      animation.value = "zoomOutUp";

      const user = {
        email: userResponse.data.email,
        a: userResponse.data.role,
        e: userResponse.data.email,
        id: userResponse.data.id,
        username: userResponse.data.username,
        role: userResponse.data.role,
        created_at: userResponse.data.created_at,
        updated_at: userResponse.data.updated_at,
      };
      store.dispatch("auth/setUser", user);

      setTimeout(() => {
        router.push(
          getPreviousRoute() === "/c/login" ? "/" : getPreviousRoute()
        );
      }, 1200);
    }
    notification.success({
      message: t("META.LOGIN.TITLE"),
      description: userResponse.message,
      duration: 3,
      placement: "bottomRight",
    });
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

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".scroll-animate").forEach((el) => {
    observer.observe(el);
  });
});
</script>
<style lang="stylus">
.scroll-animate {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;

  &.animate {
    opacity: 1;
    transform: translate(0) scale(1) !important;
  }
}

.fade-up {
  transform: translateY(50px);
}

.fade-up.animate {
  transform: translateY(0);
}

:deep(.ant-btn) {
  border-radius: 8px;

  &:hover {
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }
}
</style>
