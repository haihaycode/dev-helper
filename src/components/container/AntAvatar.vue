<template>
  <a-avatar v-bind="$attrs" :class="customClass" />
</template>

<script>
import { defineComponent } from "vue";
import { Avatar as AntAvatar } from "ant-design-vue";

export default defineComponent({
  name: "AntAvatar",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntAvatar,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
});
</script>
