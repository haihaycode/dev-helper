<template>
  <div class="login-page">
    <div class="login-container">
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
          <div class="terms-conditions">
            <AntImage
              :src="require('@/assets/logo/logo-dev-helper-1.svg')"
              :alt="'DevHelper'"
              width="100%"
              height="auto"
              :preview="false"
            />
          </div>
        </template>
        <template #right>
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
            <AntRow
              justify="center"
              class="social-login-buttons"
              gutter="{16}"
              gap="{16}"
            >
              <AntCol span="{8}">
                <AntButton type="primary" :icon="'google'" block>
                  Google
                </AntButton>
              </AntCol>
              <AntCol span="{8}">
                <AntButton type="default" :icon="'github'" block>
                  GitHub
                </AntButton>
              </AntCol>
            </AntRow>
            <RouterLink :to="{ name: 'RegisterPage' }">{{
              $t("login.registerLink")
            }}</RouterLink>
          </AntCard>
        </template>
      </AntTwoColumnCard>
    </div>
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
  "components/container/AntTwoColumnCard",
  "components/container/RouterLink",
  "components/container/AntImage",
  "components/container/AntRow",
  "components/container/AntCol",
  "components/container/AntText",
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
  max-width 1200px
  margin 20px auto



.login-container

  position relative
  z-index 2
  max-width 1200px


.login-card
  width 100%
  border none
  box-shadow none

.login-button
  width 100%

.terms-conditions
  padding 20px

.social-login-buttons
  margin 10px auto
</style>
