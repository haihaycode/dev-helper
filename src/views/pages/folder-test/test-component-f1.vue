<template>
  <div class="test-component-f1">
    <AntCard
      title="Thành phần Kiểm tra F1"
      style="width: 300px; margin: 0 auto"
    >
      <AntTextHeader tag="h1" customClass="header-class"
        >Đây là tiêu đề H1</AntTextHeader
      >
      <AntTextHeader tag="h2" customClass="header-class"
        >Đây là tiêu đề H2</AntTextHeader
      >
      <AntTextParagraph customClass="paragraph-class"
        >Đây là đoạn văn bản.</AntTextParagraph
      >
      <AntTextSpan customClass="span-class"
        >Đây là văn bản thông thường.</AntTextSpan
      >
      <AntButton type="primary" @click="handleClick">Nhấn vào tôi</AntButton>
    </AntCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { message } from "ant-design-vue";
import AntCard from "@/components/container/AntCard.vue";
import AntButton from "@/components/container/AntButton.vue";
import AntTextHeader from "@/components/container/AntTextHeader.vue";
import AntTextParagraph from "@/components/container/AntTextParagraph.vue";
import AntTextSpan from "@/components/container/AntTextSpan.vue";

export default defineComponent({
  name: "TestComponentF1",
  components: {
    AntCard,
    AntButton,
    AntTextHeader,
    AntTextParagraph,
    AntTextSpan,
  },
  setup() {
    const handleClick = () => {
      message.success("Nút đã được nhấn!");
    };

    return {
      handleClick,
    };
  },
});
</script>

<style scoped lang="stylus">
.test-component-f1
  display flex
  justify-content center
  align-items center
  height 100vh
  background-color #f0f2f5
</style>
