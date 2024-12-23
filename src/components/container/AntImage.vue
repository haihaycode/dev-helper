<template>
  <a-image
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :preview="preview"
    v-bind="$attrs"
    :class="customClass"
  />
</template>

<script>
import { defineComponent } from "vue";
import { Image as AntImage } from "ant-design-vue";

export default defineComponent({
  name: "AntImage",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntImage,
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
    width: {
      type: [String, Number],
      default: "100%",
    },
    height: {
      type: [String, Number],
      default: "auto",
    },
    preview: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
