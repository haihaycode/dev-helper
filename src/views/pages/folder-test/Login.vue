<template>
  <div class="login-page">
    <AntCard class="login-card" :title="$t('login.title')">
      <AntForm @submit.prevent="handleLogin" :model="formModel">
        <AntFormGroup :required="true">
          <AntInput
            v-model="formModel.username"
            :placeholder="$t('login.usernamePlaceholder')"
            :error="errors.username"
            prefix-icon="user"
            size="large"
          />
        </AntFormGroup>
        <AntFormGroup :required="true">
          <AntInput
            v-model="formModel.password"
            type="password"
            :placeholder="$t('login.passwordPlaceholder')"
            :error="errors.password"
            prefix-icon="lock"
            size="large"
          />
        </AntFormGroup>
        <AntFormGroup :required="true">
          <AntButton
            type="primary"
            html-type="submit"
            class="login-button"
            size="large"
            :loading="loading"
            :loading-text="$t('loading.default')"
          >
            {{ $t("login.submitButton") }}
          </AntButton>
        </AntFormGroup>
      </AntForm>

      <RouterLink :to="{ name: 'RegisterPage' }">{{
        $t("login.registerLink")
      }}</RouterLink>
    </AntCard>
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
  "components/container/RouterLink",
]);

export default defineComponent({
  name: "UserLogin",
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
    RouterLink: defineAsyncComponent(
      components["components/container/RouterLink"]
    ),
  },
  setup() {
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
        await schema.validate(formModel.value, { abortEarly: false });
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          messageTitle.value = t("login.title");
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

    return {
      formModel,
      loading,
      handleLogin,
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
.login-page
  display flex
  justify-content center
  align-items center
  height 100vh
  background-color #f0f2f5

.login-card
  width 400px
  max-width 90%
  box-shadow 0 2px 8px rgba(0, 0, 0, 0.1)

.form-group
  margin-bottom 16px

.login-button
  width 100%


</style>
