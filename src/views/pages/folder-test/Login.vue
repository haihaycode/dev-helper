<template>
  <div class="login-page">
    <AntCard class="login-card" :title="$t('login.title')">
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <AntInput
            v-model="username"
            :placeholder="$t('login.usernamePlaceholder')"
            prefix-icon="user"
            size="large"
          />
        </div>
        <div class="form-group">
          <AntInput
            v-model="password"
            type="password"
            :placeholder="$t('login.passwordPlaceholder')"
            prefix-icon="lock"
            size="large"
          />
        </div>
        <div class="form-group">
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
        </div>
      </form>
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
import { dynamicImport } from "@/utils/importUtils";

const components = dynamicImport([
  "components/container/AntCard",
  "components/container/AntInput",
  "components/container/AntButton",
  "components/container/AntModalMessage",
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
  },
  setup() {
    const { t } = useI18n();
    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    const messageVisible = ref(false);
    const messageTitle = ref("");
    const messageContent = ref("");
    const messageType = ref("info");

    const handleLogin = () => {
      if (username.value.trim() && password.value.trim()) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          messageTitle.value = t("login.title");
          messageContent.value = t("login.successMessage");
          messageType.value = "success";
          messageVisible.value = true;
        }, 1000);
      } else {
        messageTitle.value = t("login.title");
        messageContent.value = t("login.errorMessage");
        messageType.value = "error";
        messageVisible.value = true;
      }
    };

    return {
      username,
      password,
      loading,
      handleLogin,
      messageVisible,
      messageTitle,
      messageContent,
      messageType,
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
