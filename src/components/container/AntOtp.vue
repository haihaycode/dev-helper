<template>
  <div>
    <div class="flex justify-center space-x-2">
      <input
        v-for="(digit, index) in 6"
        :key="index"
        type="text"
        maxlength="1"
        :class="[
          'w-12 h-12 text-center text-2xl border rounded focus:outline-none',
          inputBorderClass,
        ]"
        v-model="otpDigits[index]"
        @input="handleInput(index)"
        @keydown="handleKeydown(index, $event)"
      />
    </div>
    <p v-if="!isValidOtp && status === 'error'" class="text-red-500 mt-2">
      {{ $t("otp.otp6Digits") }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
// import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "AntOtp",
  props: {
    initialDigits: {
      type: Array as () => string[],
      default: () => Array(6).fill(""),
    },
  },
  emits: ["otpEntered"],
  setup(props, { emit }) {
    const otpDigits = ref([...props.initialDigits]);
    const isValidOtp = ref(true);
    const status = ref("info");
    // const { t } = useI18n();
    const inputBorderClass = computed(() => {
      switch (status.value) {
        case "success":
          return "border-green-500";
        case "error":
          return "border-red-500";
        default:
          return "border-gray-300";
      }
    });

    const handleInput = (index: number) => {
      if (otpDigits.value[index].length > 1) {
        otpDigits.value[index] = otpDigits.value[index].slice(0, 1);
      }
      if (index < 5 && otpDigits.value[index]) {
        const nextInput = document.querySelectorAll("input")[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
      validateOtp();
    };

    const handleKeydown = (index: number, event: KeyboardEvent) => {
      if (event.key === "Backspace" && !otpDigits.value[index] && index > 0) {
        const prevInput = document.querySelectorAll("input")[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      }
    };

    const validateOtp = () => {
      isValidOtp.value = otpDigits.value.every((digit) => digit.length > 0);
      if (isValidOtp.value) {
        status.value = "success";
        emit("otpEntered", otpDigits.value.join(""));
      } else {
        status.value = "error";
      }
    };

    return {
      otpDigits,
      isValidOtp,
      status,
      inputBorderClass,
      handleInput,
      handleKeydown,
    };
  },
});
</script>

<style scoped>
/* Thêm style nếu cần */
</style>
