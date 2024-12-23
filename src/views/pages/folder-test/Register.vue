<!-- filepath: /D:/myproject/vue3x/DevHelper/src/views/pages/folder-test/Register.vue -->
<template>
  <div class="register-page">
    <AntRow justify="center" align="middle" class="register-container">
      <AntCol xs="{24}" md="{12}" class="register-left">
        <img
          src="https://img.freepik.com/premium-vector/solution-tech-logo_5379-2.jpg"
          alt="Logo"
          class="logo"
        />
      </AntCol>
      <AntCol xs="{24}" md="{12}" class="register-right">
        <AntCard class="register-card no-border" :title="$t('register.title')">
          <AntForm @submit.prevent="handleRegister" :model="formModel">
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
                type="password"
                :placeholder="$t('register.passwordPlaceholder')"
                :error="errors.password"
                prefix-icon="lock"
                size="large"
              />
            </AntFormGroup>
            <AntFormGroup :required="true">
              <AntButton
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
          <div class="switch-link">
            <router-link to="/login">{{
              $t("register.loginLink")
            }}</router-link>
          </div>
        </AntCard>
      </AntCol>
    </AntRow>
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

const components = dynamicImport([
  "components/container/AntCard",
  "components/container/AntInput",
  "components/container/AntButton",
  "components/container/AntModalMessage",
  "components/container/AntFormGroup",
  "components/container/AntForm",
  "components/container/AntRow",
  "components/container/AntCol",
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
    AntRow: defineAsyncComponent(components["components/container/AntRow"]),
    AntCol: defineAsyncComponent(components["components/container/AntCol"]),
  },
  setup() {
    const { t } = useI18n();
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
        setTimeout(() => {
          loading.value = false;
          messageTitle.value = t("register.title");
          messageContent.value = t("register.successMessage");
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

    return {
      formModel,
      loading,
      handleRegister,
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


.register-container
  width 100%
  max-width 900px
  box-shadow 0 2px 8px rgba(0, 0, 0, 0.1)
  border-radius 8px
  overflow hidden
  background-color #fff

.register-left
  display flex
  justify-content center
  align-items center

  padding 20px

.logo
  width 200px
  height auto

.register-right
  padding 40px


.register-card
  width 100%
  border none
  box-shadow none

.register-button
  width 100%

.switch-link
  margin-top 16px
  text-align center

.switch-link a
  color #1890ff
  text-decoration none
</style>
