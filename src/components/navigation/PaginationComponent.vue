<template>
  <div id="PaginationComponent">
    <a-pagination
      :current="Number(pageInfo?.page) ?? 1"
      :pageSize="Number(pageInfo?.pageSize ?? 10)"
      :total="Number(pageInfo?.totalCount) || 0"
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
import { SCROLL_TO } from "@/utils/global";

defineProps({
  pageInfo: {
    type: Object as PropType<IPageInfo<IVocabulary> | undefined>,
    required: false,
  },
});
const emit = defineEmits(["pageChange", "pageSizeChange"]);
const handlePageChange = (page: number) => {
  SCROLL_TO.TOP();
  emit("pageChange", page);
};
const handlePageSizeChange = (current: number, pageSize: number) => {
  SCROLL_TO.TOP();
  emit("pageSizeChange", { current, pageSize });
};
</script>
