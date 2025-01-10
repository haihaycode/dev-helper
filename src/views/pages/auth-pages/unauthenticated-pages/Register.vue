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
          <div class="max-w-md mx-auto">
            <h1
              class="text-3xl font-bold font-mono text-amber-800 mb-8 text-center"
            >
              {{ $t("register.title") }}
            </h1>

            <a-form :model="formModel" class="space-y-6">
              <a-form-item :required="true">
                <a-input
                  v-model:value="formModel.username"
                  :placeholder="$t('register.usernamePlaceholder')"
                  size="large"
                  :status="errors.username ? 'error' : ''"
                >
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item :required="true">
                <a-input
                  v-model:value="formModel.email"
                  type="email"
                  :placeholder="$t('register.emailPlaceholder')"
                  size="large"
                  :status="errors.email ? 'error' : ''"
                >
                  <template #prefix>
                    <MailOutlined />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item :required="true">
                <a-input-password
                  v-model:value="formModel.password"
                  :placeholder="$t('register.passwordPlaceholder')"
                  size="large"
                  :status="errors.password ? 'error' : ''"
                >
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-button
                type="primary"
                @click="handleRegister"
                class="w-full h-12 rounded-lg bg-amber-600 hover:bg-amber-700 border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-700"
                :loading="loading"
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
                  @click="handleGoogleRegister"
                >
                  Google
                </a-button>
                <a-button
                  class="h-12 rounded-lg border-2 hover:border-amber-500 hover:text-amber-600 transition-colors duration-300"
                  @click="handleGithubRegister"
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
  name: "UserRegisterPage",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import * as yup from "yup";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
import { auth, githubProvider, googleProvider } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { getFirebaseMessage } from "@/services/firebase/firebaseMessages";
import { FirebaseError } from "firebase/app";

const { t } = useI18n();
const router = useRouter();

const formModel = ref({
  username: "",
  email: "",
  password: "",
});

const loading = ref(false);
const messageVisible = ref(false);
const messageTitle = ref("");
const messageContent = ref("");
const messageType = ref("info");
const errors = ref<Record<string, string>>({});

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
    loading.value = true;

    await createUserWithEmailAndPassword(
      auth,
      formModel.value.email,
      formModel.value.password
    );

    messageTitle.value = t("register.successTitle");
    messageContent.value = t("register.successMessage");
    messageType.value = "success";
    messageVisible.value = true;
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
    } else if (err instanceof FirebaseError) {
      messageTitle.value = t("register.title");
      messageContent.value = getFirebaseMessage(err.code, t);
      messageType.value = "error";
      messageVisible.value = true;
    }
  } finally {
    loading.value = false;
  }
};

const handleGoogleRegister = async () => {
  loading.value = true;
  try {
    if (window.innerWidth <= 768) {
      await signInWithRedirect(auth, googleProvider);
    } else {
      await signInWithPopup(auth, googleProvider);
    }
    messageTitle.value = t("register.successTitle");
    messageContent.value = t("register.successMessage");
    messageType.value = "success";
    router.push({ name: "LoginPage" });
  } catch (error: any) {
    messageTitle.value = t("register.errorTitle");
    messageContent.value = getFirebaseMessage(error.code, t);
    messageType.value = "error";
  } finally {
    loading.value = false;
    messageVisible.value = true;
  }
};

const handleGithubRegister = async () => {
  loading.value = true;
  try {
    if (window.innerWidth <= 768) {
      await signInWithRedirect(auth, githubProvider);
    } else {
      await signInWithPopup(auth, githubProvider);
    }
    messageTitle.value = t("register.successTitle");
    messageContent.value = t("register.successMessage");
    messageType.value = "success";
    router.push({ name: "LoginPage" });
  } catch (error: any) {
    messageTitle.value = t("register.errorTitle");
    messageContent.value = getFirebaseMessage(error.code, t);
    messageType.value = "error";
  } finally {
    loading.value = false;
    messageVisible.value = true;
  }
};
</script>

<style lang="stylus">
:deep(.ant-input-affix-wrapper) {
  &:hover, &:focus {
    border-color: #d97706 !important;
  }
}

:deep(.ant-btn-primary) {
  background: #d97706 !important;
  &:hover {
    background: #b45309 !important;
  }
}

:deep(.ant-btn) {
  &:hover {
    color: #d97706;
    border-color: #d97706;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
