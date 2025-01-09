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
        <a-form @submit.prevent="fetchVideoInfo" class="flex space-x-2">
          <a-form-item class="flex-grow">
            <a-input
              v-model:value="videoUrl"
              placeholder="Enter TikTok video URL"
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
            v-if="videoInfo"
            class="flex flex-col sm:flex-row mt-4 items-center"
          >
            <div class="flex-shrink-0 sm:w-1/3">
              <video
                :src="videoInfo.downloadUrl"
                controls
                class="w-full h-auto aspect-video"
              ></video>
            </div>
            <div class="flex-grow sm:w-2/3 sm:ml-4">
              <a-typography class="text-left">
                <a-typography-title level="{4}">Video Info:</a-typography-title>
                <a-typography-paragraph>
                  <strong>Description:</strong>
                  {{ videoInfo.description || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Author:</strong>
                  {{ videoInfo.author.username || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Likes:</strong>
                  {{ videoInfo.stats.likes || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Comments:</strong>
                  {{ videoInfo.stats.comments || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <strong>Views:</strong>
                  {{ videoInfo.stats.views || "No data" }}
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <a-button
                    class="text-white"
                    type="primary"
                    :href="videoInfo.downloadUrl"
                    download
                  >
                    Download Video
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
import { getTikTokVideo } from "@/api/rapidapi/tiktokApi";
import { tiktokVideoDownloader } from "@/models/tiktok";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "DownloadWithoutWatermarkToolsPage",
  components: {
    Breadcrumb,
  },
  setup() {
    const { t } = useI18n();
    const videoUrl = ref("");
    const videoInfo = ref<tiktokVideoDownloader | null>(null);
    const store = useStore();
    const isLoadingGet = computed(() => store.getters["loading/isLoadingGet"]);

    const fetchVideoInfo = async () => {
      if (!videoUrl.value.trim()) {
        message.error("Please enter a TikTok video URL");
        console.log(videoUrl.value);
        return;
      }
      try {
        const result = await getTikTokVideo(videoUrl.value.trim());
        videoInfo.value = result;
      } catch (error) {
        console.error("Error fetching video info:", error);
      }
    };

    const toolId = "3";
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
      videoUrl,
      videoInfo,
      fetchVideoInfo,
      isLoadingGet,
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
