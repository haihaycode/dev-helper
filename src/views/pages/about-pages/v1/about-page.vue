<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-500 to-amber-700">
    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-24 animate-fade-in">
      <a-row :gutter="[32, 32]" class="items-center">
        <a-col :xs="24" :md="12">
          <div class="text-white space-y-8 animate-slide-left">
            <h1 class="text-6xl font-bold font-mono leading-tight">
              {{ $t("about.title") }}
            </h1>
            <p class="text-xl opacity-90 leading-relaxed">
              {{ $t("about.description") }}
            </p>
            <a-button
              type="primary"
              size="large"
              class="bg-white text-amber-600 border-none hover:bg-amber-50 px-8 h-12 text-lg"
              @click="scrollToFeatures"
            >
              {{ $t("about.learnMore") }}
            </a-button>
          </div>
        </a-col>
        <a-col :xs="24" :md="12">
          <div class="relative animate-slide-right">
            <a-image
              :src="require('@/assets/logo/DEV-HELPER.gif')"
              class="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              :preview="false"
            />
            <div
              class="absolute -inset-4 bg-amber-300 rounded-2xl -z-10 opacity-20 blur-xl"
            ></div>
          </div>
        </a-col>
      </a-row>
    </div>

    <!-- Features Section -->
    <div id="features" class="bg-white py-24" ref="featuresSection">
      <div class="container mx-auto px-4">
        <h2
          class="text-4xl font-bold text-center text-amber-800 mb-16 scroll-animate fade-up"
        >
          {{ $t("about.features.title") }}
        </h2>
        <a-row :gutter="[32, 32]">
          <a-col
            :xs="24"
            :md="8"
            v-for="(feature, index) in features"
            :key="index"
          >
            <div
              class="p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100 scroll-animate"
              :class="index % 2 === 0 ? 'slide-right' : 'slide-left'"
              :style="`transition-delay: ${index * 200}ms`"
            >
              <div class="flex flex-col items-center text-center space-y-6">
                <div
                  class="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center"
                >
                  <component :is="feature.icon" class="text-white text-3xl" />
                </div>
                <h3 class="text-2xl font-bold text-amber-800">
                  {{ feature.title }}
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-amber-50 py-24" ref="statsSection">
      <div class="container mx-auto px-4">
        <a-row :gutter="[24, 24]">
          <a-col
            :xs="24"
            :sm="12"
            :md="6"
            v-for="(stat, index) in stats"
            :key="index"
          >
            <div
              class="text-center p-8 scroll-animate zoom-in"
              :style="`transition-delay: ${index * 150}ms`"
            >
              <h4 class="text-5xl font-bold text-amber-600 mb-4">
                {{ stat.value }}
              </h4>
              <p class="text-lg text-gray-600">{{ stat.label }}</p>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>

    <!-- CTA Section -->
    <div
      class="bg-gradient-to-r from-amber-600 to-amber-700 py-24"
      ref="ctaSection"
    >
      <div class="container mx-auto px-4 text-center scroll-animate fade-up">
        <div class="max-w-3xl mx-auto space-y-8">
          <h2 class="text-4xl font-bold text-white">
            {{ $t("about.cta.title") }}
          </h2>
          <p class="text-xl text-amber-100">
            {{ $t("about.cta.description") }}
          </p>
          <div class="flex justify-center gap-4">
            <a-button
              type="primary"
              size="large"
              class="bg-white text-amber-600 border-none hover:bg-amber-50 px-8 h-12 text-lg scroll-animate slide-right"
              @click="$router.push('/c/register')"
            >
              {{ $t("about.cta.primaryButton") }}
            </a-button>
            <a-button
              ghost
              size="large"
              class="border-white text-white hover:text-amber-100 hover:border-amber-100 px-8 h-12 text-lg scroll-animate slide-left"
              @click="$router.push('/c/login')"
            >
              {{ $t("about.cta.secondaryButton") }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import {
  RocketOutlined,
  TeamOutlined,
  ToolOutlined,
} from "@ant-design/icons-vue";

const features = [
  {
    icon: RocketOutlined,
    title: "Phát triển nhanh chóng",
    description:
      "Cung cấp các công cụ và giải pháp giúp tăng tốc quá trình phát triển của bạn.",
  },
  {
    icon: TeamOutlined,
    title: "Hợp tác hiệu quả",
    description: "Nền tảng hỗ trợ làm việc nhóm và chia sẻ kiến thức dễ dàng.",
  },
  {
    icon: ToolOutlined,
    title: "Công cụ đa dạng",
    description: "Đa dạng công cụ hỗ trợ cho nhiều nền tảng khác nhau.",
  },
];

const stats = [
  { value: "10K+", label: "Người dùng" },
  { value: "50+", label: "Công cụ" },
  { value: "24/7", label: "Hỗ trợ" },
  { value: "99%", label: "Độ hài lòng" },
];

const scrollToFeatures = () => {
  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
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
// Base transitions
.scroll-animate {
  opacity: 0;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);

  &.animate {
    opacity: 1;
    transform: translate(0) scale(1) !important;
  }
}

// Slide animations
.slide-left {
  transform: translateX(-100px);
}

.slide-right {
  transform: translateX(100px);
}

// Fade animations
.fade-up {
  transform: translateY(50px);
}

// Zoom animations
.zoom-in {
  transform: scale(0.5);
}

// Initial animations
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-left {
  animation: slideLeft 1s ease-out forwards;
}

.animate-slide-right {
  animation: slideRight 1s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideLeft {
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideRight {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
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
