<template>
  <div
    class="min-h-screen bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center p-4"
  >
    <div class="max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden">
      <a-row class="min-h-[600px]">
        <!-- Left side -->
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
              {{ $t("login.welcomeMessage") }}
            </h2>
            <p class="text-white font-mono text-sm scroll-animate fade-up">
              {{ $t("login.description") }}
            </p>
          </div>
        </a-col>

        <!-- Right side -->
        <a-col :xs="24" :sm="24" :md="12" class="p-8 bg-white">
          <div class="max-w-md mx-auto">
            <h1
              class="text-3xl font-bold font-mono text-amber-800 mb-8 text-center scroll-animate fade-up"
            >
              {{ $t("login.title") }}
            </h1>

            <a-form :model="formModel" class="space-y-6">
              <a-form-item
                :required="true"
                :validate-status="errors.username ? 'error' : ''"
                :help="errors.username"
              >
                <a-input
                  v-model:value="formModel.username"
                  :placeholder="$t('login.usernamePlaceholder')"
                  size="large"
                >
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item
                :required="true"
                :validate-status="errors.password ? 'error' : ''"
                :help="errors.password"
              >
                <a-input-password
                  v-model:value="formModel.password"
                  :placeholder="$t('login.passwordPlaceholder')"
                  size="large"
                >
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-button
                type="primary"
                @click="handleLogin"
                class="w-full h-12 rounded-lg bg-amber-600 hover:bg-amber-700 border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700 scroll-animate fade-up"
                :loading="loading"
              >
                {{ $t("login.submitButton") }}
              </a-button>

              <div class="relative my-8">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span
                    class="px-2 bg-white text-gray-500 scroll-animate fade-up"
                  >
                    {{ $t("login.orLoginWith") }}
                  </span>
                </div>
              </div>

              <div class="text-center mt-6">
                <router-link
                  :to="{ name: 'RegisterPage' }"
                  class="text-amber-600 hover:text-amber-700 transition-colors scroll-animate fade-up"
                >
                  {{ $t("login.registerLink") }}
                </router-link>
              </div>
            </a-form>
          </div>
        </a-col>
      </a-row>
    </div>

    <a-modal
      v-model:visible="messageVisible"
      :title="messageTitle"
      :closable="true"
      @ok="messageVisible = false"
    >
      <p>{{ messageContent }}</p>
    </a-modal>
  </div>
</template>

<script lang="ts">
export default {
  name: "UserLoginPage",
};
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import * as yup from "yup";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

const { t } = useI18n();

const formModel = ref({
  username: "",
  password: "",
});

const loading = ref(false);
const messageVisible = ref(false);
const messageTitle = ref("");
const messageContent = ref("");
const messageType = ref("info");
const errors = ref<Record<string, string>>({});

const schema = yup.object().shape({
  username: yup.string().required(t("login.errorMessage")),
  password: yup.string().required(t("login.errorMessage")),
});

const handleLogin = async () => {
  try {
    errors.value = {};
    await schema.validate(formModel.value, { abortEarly: false });
    loading.value = true;

    // Thực hiện login logic ở đây

    setTimeout(() => {
      loading.value = false;
      messageTitle.value = t("login.successTitle");
      messageContent.value = t("login.successMessage");
      messageType.value = "success";
      messageVisible.value = true;
    }, 1000);
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
