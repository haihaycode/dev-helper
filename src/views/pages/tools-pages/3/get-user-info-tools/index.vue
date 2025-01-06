<template>
  <div class="main min-h-[100vh] sm:p-2 md:p-4 lg:p-6 xl:p-8">
    <Breadcrumb :items="breadcrumbItems" />
    <a-transition name="fade" mode="out-in">
      <div class="title mt-2 sm:mt-2 px-2" v-if="tool">
        <a-typography-title :level="3" class="text-center">
          {{ $t(tool.name) }} &nbsp;
        </a-typography-title>

        <a-typography-paragraph
          class="hidden sm:block"
          style="text-align: left"
        >
          {{ $t(tool.description) }}
        </a-typography-paragraph>
        <a-typography-paragraph
          class="sm:hidden block"
          style="text-align: left"
        >
          {{ truncateString($t(tool.description), 200) }}
        </a-typography-paragraph>
      </div>
      <div class="content mt-4 px-2 sm:mt-2" v-if="tool">
        <a-form @submit.prevent="fetchUserInfo" class="flex space-x-2">
          <a-form-item class="flex-grow">
            <a-input
              v-model:value="username"
              placeholder="Enter TikTok username"
              class="w-full"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :loading="isLoadingGet"
              class="w-full"
            >
              Search
            </a-button>
          </a-form-item>
        </a-form>
        <a-spin :spinning="isLoadingGet">
          <div
            v-if="userInfo"
            class="flex flex-col sm:flex-row mt-4 items-center"
          >
            <div class="flex-shrink-0 sm:w-1/3">
              <a-avatar
                :src="userInfo.avatar"
                size="large"
                class="w-48 h-48 object-cover rounded-full"
                @error="onImageError"
              />
            </div>
            <div
              class="flex-grow sm:w-2/3 sm:ml-4 bg-gray-100 p-2 bg-opacity-40"
            >
              <a-typography class="text-left">
                <a-typography-title level="{4}">{{
                  userInfo.username
                }}</a-typography-title>
                <a-typography-paragraph>
                  <strong>Username:</strong>
                  {{ userInfo.username || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Nickname:</strong>
                  {{ userInfo.nickname || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Verified:</strong>
                  {{ userInfo.verified ? "Yes" : "No" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Language:</strong>
                  {{ userInfo.language || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Region:</strong> {{ userInfo.region || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Bio:</strong> {{ userInfo.bio || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Following:</strong>
                  {{ userInfo.stats.following || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Followers:</strong>
                  {{ userInfo.stats.followers || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Likes:</strong>
                  {{ userInfo.stats.likes || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Videos:</strong>
                  {{ userInfo.stats.videos || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Friends:</strong>
                  {{ userInfo.stats.friends || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <a-button
                    type="link"
                    :href="'https://www.tiktok.com/@' + userInfo.username"
                    target="_blank"
                  >
                    <LinkOutlined />
                    Go to TikTok Profile
                  </a-button>
                </a-typography-paragraph>
              </a-typography>
            </div>
          </div>
        </a-spin>
      </div>
    </a-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import Breadcrumb from "@/components/container/Breadcrumb.vue";
import { getToolTypeById, getToolById } from "@/services/tools/toolsService";
import { useI18n } from "vue-i18n";
import { truncateString } from "@/utils/StringUtils";
import { getTikTokUserProfile } from "@/api/rapidapi/tiktokApi";
import { TikTokUserProfile } from "@/models/tiktok";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import { LinkOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "SecretKeyEncryptionToolsPage",
  components: {
    Breadcrumb,
    LinkOutlined,
  },
  setup() {
    const { t } = useI18n();
    const username = ref("");
    const userInfo = ref<TikTokUserProfile | null>(null);
    const store = useStore();
    const isLoadingGet = computed(() => store.getters["loading/isLoadingGet"]);

    const fetchUserInfo = async () => {
      if (!username.value.trim()) {
        message.error("Please enter a TikTok username");
        console.log(username.value);
        return;
      }
      try {
        const result = await getTikTokUserProfile(username.value.trim());
        userInfo.value = result;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const onImageError = (event: Event) => {
      (event.target as HTMLImageElement).src =
        "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
    };

    const toolId = "2";
    const tool = getToolById(toolId);
    const toolTypeId = tool?.idtoolsType || "";
    const toolType = getToolTypeById(toolTypeId);

    const breadcrumbItems = computed(() => [
      { href: "/", text: "Home", path: "homePage" },
      { href: `/t/tools`, text: toolType?.name, path: "toolsIndex" },
      { text: tool?.name },
    ]);

    return {
      t,
      tool,
      toolType,
      breadcrumbItems,
      truncateString,
      username,
      userInfo,
      fetchUserInfo,
      isLoadingGet,
      onImageError,
    };
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.ant-typography {
  margin-bottom: 0px;
}
</style>
