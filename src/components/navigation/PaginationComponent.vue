<template>
  <div id="PaginationComponent">
    <a-pagination
      :current="pageInfo?.page"
      :pageSize="pageInfo?.pageSize"
      :total="pageInfo?.totalCount"
      @change="handlePageChange"
      show-size-changer
      @showSizeChange="handlePageSizeChange"
      class="flex justify-center mt-4"
    ></a-pagination>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { IPageInfo } from "@/models/base";
import { IVocabulary } from "@/models/IIearnEnglish";
import { PropType } from "vue";

defineProps({
  pageInfo: {
    type: Object as PropType<IPageInfo<IVocabulary> | undefined>,
    required: false,
  },
});
const emit = defineEmits(["pageChange", "pageSizeChange"]);
const handlePageChange = (page: number) => {
  emit("pageChange", page);
};
const handlePageSizeChange = (current: number, pageSize: number) => {
  emit("pageSizeChange", { current, pageSize });
};
</script>
