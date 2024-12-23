<!-- filepath: /d:/myproject/vue3x/DevHelper/src/components/container/AntTwoColumnCard.vue -->
<template>
  <a-card class="two-column-card">
    <a-row :gutter="gutter">
      <a-col
        :xs="leftSpanXs"
        :sm="leftSpanSm"
        :md="leftSpanMd"
        :lg="leftSpanLg"
        :xl="leftSpanXl"
        class="left-column"
      >
        <slot name="left"></slot>
      </a-col>
      <a-col
        :xs="rightSpanXs"
        :sm="rightSpanSm"
        :md="rightSpanMd"
        :lg="rightSpanLg"
        :xl="rightSpanXl"
        class="right-column"
      >
        <slot name="right"></slot>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Card as AntCard, Row as AntRow, Col as AntCol } from "ant-design-vue";

export default defineComponent({
  name: "AntTwoColumnCard",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntCard,
    // eslint-disable-next-line vue/no-unused-components
    AntRow,
    // eslint-disable-next-line vue/no-unused-components
    AntCol,
  },
  props: {
    gutter: {
      type: Number,
      default: 16,
    },
    leftSpanXs: {
      type: Number,
      default: 24,
    },
    leftSpanSm: {
      type: Number,
      default: 24,
    },
    leftSpanMd: {
      type: Number,
      default: 12,
    },
    leftSpanLg: {
      type: Number,
      default: 12,
    },
    leftSpanXl: {
      type: Number,
      default: 12,
    },
    rightSpanXs: {
      type: Number,
      default: 24,
    },
    rightSpanSm: {
      type: Number,
      default: 24,
    },
    rightSpanMd: {
      type: Number,
      default: 12,
    },
    rightSpanLg: {
      type: Number,
      default: 12,
    },
    rightSpanXl: {
      type: Number,
      default: 12,
    },
  },
});
</script>

<style scoped>
.two-column-card {
  width: 100%;
  border: none;
  box-shadow: none;
}
.left-column,
.right-column {
  padding: 16px;
  display: flex;
  align-items: center;
}
</style>
