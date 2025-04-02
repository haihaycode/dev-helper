<template>
  <div id="SPINCUSTOMCOMPONENT">
    <a-spin
      :indicator="indicator"
      :delay="10"
      :spinning="isLoadingGet || loading"
      size="large"
      wrapperClassName="spin-wrapper"
      class="min-h-screen"
    >
      <slot></slot>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, h } from "vue";
import { useStore } from "vuex";
defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});
const store = useStore();
const isLoadingGet = computed(() => store.getters["loading/isLoadingGet"]);

const svgSpinner = `
   <svg
    xmlns="http://www.w3.org/2000/svg"
    class="animate-spin"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1E3A8A"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
    <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="1"></path>
  </svg>
`;
// const svgSpinner = `
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="50"
//   height="10"
//   viewBox="0 0 50 10"
//   fill="#1E3A8A"
// >
//   <circle cx="5" cy="5" r="5">
//     <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0s"/>
//   </circle>
//   <circle cx="25" cy="5" r="5">
//     <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.3s"/>
//   </circle>
//   <circle cx="45" cy="5" r="5">
//     <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.6s"/>
//   </circle>
// </svg>

// `;
const indicator = h("div", {
  innerHTML: svgSpinner,
});
</script>
