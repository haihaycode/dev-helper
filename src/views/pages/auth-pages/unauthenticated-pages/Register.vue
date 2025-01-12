<template>
  <div
    class="min-h-screen bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center p-4"
  >
    <div
      v-if="step === 1"
      class="max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden"
    >
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
            <h2
              class="text-white text-2xl font-bold mb-4 scroll-animate fade-up"
            >
              {{ $t("register.title") }}
            </h2>
            <p class="text-white font-mono text-sm scroll-animate fade-up">
              {{ $t("register.description") }}
            </p>
          </div>
        </a-col>

        <!-- Right side - Register Form -->
        <a-col :xs="24" :sm="24" :md="12" class="p-8 bg-white">
          <div class="max-w-md mx-auto">
            <h1
              class="text-3xl font-bold font-mono text-amber-800 mb-8 text-center scroll-animate fade-up"
            >
              {{ $t("register.title") }}
            </h1>

            <a-form
              @submit.prevent="handleRegister"
              :model="formModel"
              class="space-y-6"
            >
              <a-form-item
                :required="true"
                :validate-status="errors.username ? 'error' : ''"
                :help="errors.username"
              >
                <a-input
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
                  class="hover:border-amber-600 focus:border-amber-600 focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700 font-mono"
                  v-model:value="formModel.email"
                  type="email"
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

              <a-button
                type="primary"
                @click="handleRegister"
                class="w-full h-12 rounded-sm bg-amber-600 hover:bg-amber-700 border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700 scroll-animate fade-up"
                :loading="loading"
              >
                {{ $t("register.submitButton") }}
              </a-button>

              <div class="relative my-8">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span
                    class="px-2 bg-white text-gray-500 scroll-animate fade-up"
                  >
                    {{ $t("register.orRegisterWith") }}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <a-button
                  class="h-12 rounded-lg border-2 hover:border-amber-500 hover:text-amber-600 transition-colors duration-300 scroll-animate fade-up"
                >
                  Google
                </a-button>
                <a-button
                  class="h-12 rounded-lg border-2 hover:border-amber-500 hover:text-amber-600 transition-colors duration-300 scroll-animate fade-up"
                >
                  GitHub
                </a-button>
              </div>

              <div class="text-center mt-6">
                <router-link
                  :to="{ name: 'LoginPage' }"
                  class="text-amber-600 hover:text-amber-700 transition-colors scroll-animate fade-up"
                >
                  {{ $t("register.loginLink") }}
                </router-link>
              </div>
            </a-form>
          </div>
        </a-col>
      </a-row>
    </div>
    <div v-else>
      <div class="text-center mt-8 bg-white p-8 rounded-sm bg-opacity-80">
        <h1 class="text-3xl font-bold text-amber-600 mb-4">
          {{ $t("register.otpTitle") }}
        </h1>
        <p class="text-gray-700 text-lg mb-6">
          {{ $t("register.otpDescription") }}
        </p>
        <AntOtp />
        <div class="flex justify-center gap-4 px-8 mt-8">
          <a-button
            type="primary"
            class="w-full h-12 rounded-sm bg-amber-600 hover:bg-amber-700 border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700 scroll-animate fade-up"
          >
            {{ $t("register.optResend") }}
          </a-button>
          <a-button
            type="primary"
            class="w-full h-12 rounded-sm bg-amber-600 hover:bg-amber-700 border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700 scroll-animate fade-up"
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
  </div>
</template>

<script lang="ts">
export default {
  name: "UserRegisterPage",
};
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import * as yup from "yup";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
import AntOtp from "@/components/container/AntOtp.vue";

const { t } = useI18n();
const router = useRouter();

const formModel = ref({
  username: "",
  email: "",
  password: "",
});

const loading = ref(false);
const errors = ref<Record<string, string>>({});
const step = ref(2);

const schema = yup.object().shape({
  username: yup.string().required(t("register.errorMessage")),
  email: yup
    .string()
    .email(t("register.invalidEmail"))
    .required(t("register.errorMessage")),
  password: yup.string().required(t("register.errorMessage")),
});

const handleRegister = async () => {
  try {
    await schema.validate(formModel.value, { abortEarly: false });
    // logic
    router.push({ name: "LoginPage" });
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

.container {
  max-width: 1280px;
}
</style>
