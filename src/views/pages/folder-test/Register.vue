<template>
  <div class="register-page">
    <AntTwoColumnCard
      :gutter="24"
      :leftSpanXs="24"
      :leftSpanSm="24"
      :leftSpanMd="12"
      :leftSpanLg="12"
      :leftSpanXl="12"
      :rightSpanXs="24"
      :rightSpanSm="24"
      :rightSpanMd="12"
      :rightSpanLg="12"
      :rightSpanXl="12"
    >
      <template #left>
        <AntImage
          :src="require('@/assets/logo/logo-dev-helper-1.svg')"
          :alt="'DevHelper'"
          width="100%"
          height="auto"
          :preview="false"
        />
      </template>
      <template #right>
        <AntCard class="register-card no-border" :title="$t('register.title')">
          <AntForm :model="formModel">
            <AntFormGroup :required="true">
              <AntInput
                v-model="formModel.username"
                :placeholder="$t('register.usernamePlaceholder')"
                :error="errors.username"
                prefix-icon="user"
                size="large"
              />
            </AntFormGroup>
            <AntFormGroup :required="true">
              <AntInput
                v-model="formModel.email"
                type="email"
                :placeholder="$t('register.emailPlaceholder')"
                :error="errors.email"
                prefix-icon="mail"
                size="large"
              />
            </AntFormGroup>
            <AntFormGroup :required="true">
              <AntInput
                v-model="formModel.password"
                :label="$t('register.passwordLabel')"
                type="password"
                :placeholder="$t('register.passwordPlaceholder')"
                :error="errors.password"
                prefix-icon="lock"
                size="large"
              />
            </AntFormGroup>
            <AntFormGroup :required="true">
              <AntButton
                @click="handleRegister"
                type="primary"
                html-type="submit"
                class="register-button"
                size="large"
                :loading="loading"
                :loading-text="$t('loading.default')"
              >
                {{ $t("register.submitButton") }}
              </AntButton>
            </AntFormGroup>
          </AntForm>
          <!-- <AntText>{{ $t("register.orRegisterWith") }}</AntText> -->
          <AntRow
            justify="center"
            class="social-login-buttons"
            gutter="{16}"
            gap="{16}"
          >
            <AntCol span="{8}">
              <AntButton
                type="ghost"
                @click="handleGoogleRegister"
                :icon="'google'"
                block
              >
                Google
              </AntButton>
            </AntCol>
            <AntCol span="{8}">
              <AntButton
                type="primary"
                @click="handleGithubRegister()"
                :icon="'github'"
                block
              >
                GitHub
              </AntButton>
            </AntCol>
          </AntRow>

          <RouterLink :to="{ name: 'LoginPage' }">{{
            $t("register.loginLink")
          }}</RouterLink>
        </AntCard>
      </template>
    </AntTwoColumnCard>
    <AntModalMessage
      :visible="messageVisible"
      :title="messageTitle"
      :content="messageContent"
      :type="messageType"
      @update:visible="messageVisible = $event"
    >
      <p>{{ messageContent }}</p>
    </AntModalMessage>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";
import * as yup from "yup";
import { dynamicImport } from "@/utils/importUtils";
import {
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from "@ant-design/icons-vue";
import { auth, githubProvider, googleProvider } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { getFirebaseMessage } from "@/services/firebase/firebaseMessages";
import { FirebaseError } from "firebase/app";
import { useRouter } from "vue-router";

const components = dynamicImport([
  "components/container/AntCard",
  "components/container/AntInput",
  "components/container/AntButton",
  "components/container/AntModalMessage",
  "components/container/AntFormGroup",
  "components/container/AntForm",
  "components/container/AntTwoColumnCard",
  "components/container/RouterLink",
  "components/container/AntImage",
  "components/container/AntRow",
  "components/container/AntCol",
  "components/container/AntText",
]);

export default defineComponent({
  name: "UserRegister",
  components: {
    AntCard: defineAsyncComponent(components["components/container/AntCard"]),
    AntInput: defineAsyncComponent(components["components/container/AntInput"]),
    AntButton: defineAsyncComponent(
      components["components/container/AntButton"]
    ),
    AntModalMessage: defineAsyncComponent(
      components["components/container/AntModalMessage"]
    ),
    AntFormGroup: defineAsyncComponent(
      components["components/container/AntFormGroup"]
    ),
    AntForm: defineAsyncComponent(components["components/container/AntForm"]),
    AntTwoColumnCard: defineAsyncComponent(
      components["components/container/AntTwoColumnCard"]
    ),
    RouterLink: defineAsyncComponent(
      components["components/container/RouterLink"]
    ),
    AntImage: defineAsyncComponent(components["components/container/AntImage"]),
    AntRow: defineAsyncComponent(components["components/container/AntRow"]),
    AntCol: defineAsyncComponent(components["components/container/AntCol"]),
    // AntText: defineAsyncComponent(components["components/container/AntText"]),
    // eslint-disable-next-line vue/no-unused-components
    GoogleOutlined,
    // eslint-disable-next-line vue/no-unused-components
    FacebookOutlined,
    // eslint-disable-next-line vue/no-unused-components
    GithubOutlined,
  },
  setup() {
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
        console.log("registering user");

        await createUserWithEmailAndPassword(
          auth,
          formModel.value.email,
          formModel.value.password
        );
        loading.value = false;
        messageTitle.value = t("register.title");
        messageContent.value = t("register.successMessage");
        messageType.value = "success";
        messageVisible.value = true;
        router.push({ name: "LoginPage" });
      } catch (err) {
        loading.value = false;
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
          const errorMessage = getFirebaseMessage(err.code, t);
          messageContent.value = errorMessage;
          messageType.value = "error";
          messageVisible.value = true;
        }
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorMessage = getFirebaseMessage(error.code, t);
        messageTitle.value = t("register.errorTitle");
        messageContent.value = errorMessage;
        messageType.value = "error";
      } finally {
        loading.value = false;
        messageVisible.value = true;
        router.push({ name: "LoginPage" });
      }
    };

    const handleGithubRegister = async () => {
      loading.value = true;
      try {
        if (window.innerWidth <= 768) {
          // 768px or smaller for mobile
          await signInWithRedirect(auth, githubProvider);
        } else {
          await signInWithPopup(auth, githubProvider);
        }
        messageTitle.value = t("register.successTitle");
        messageContent.value = t("register.successMessage");
        messageType.value = "success";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorMessage = getFirebaseMessage(error.code, t);
        messageTitle.value = t("register.errorTitle");
        messageContent.value = errorMessage;
        messageType.value = "error";
      } finally {
        loading.value = false;
        messageVisible.value = true;
        router.push({ name: "LoginPage" });
      }
    };

    return {
      formModel,
      loading,
      handleRegister,
      handleGithubRegister,
      handleGoogleRegister,
      messageVisible,
      messageTitle,
      messageContent,
      messageType,
      errors,
      t,
    };
  },
});
</script>

<style scoped lang="stylus">
.register-page
  display flex
  justify-content center
  align-items center
  height 100vh
  max-width 1200px
  margin 20px auto

.logo
  width 100%
  height auto

.register-card
  width 100%
  border none
  box-shadow none

.register-button
  width 100%

.social-login-buttons
  margin 10px auto
</style>
