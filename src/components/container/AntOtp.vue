<template>
  <div class="flex justify-center space-x-2">
    <input
      v-for="(digit, index) in 6"
      :key="index"
      type="text"
      maxlength="1"
      class="w-12 h-12 text-center text-2xl border border-gray-300 rounded focus:outline-none focus:border-amber-500"
      v-model="otpDigits[index]"
      @input="handleInput(index)"
      @keydown="handleKeydown(index, $event)"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "OTPInput",
  setup() {
    const otpDigits = ref(Array(6).fill(""));
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
    };

    const handleKeydown = (index: number, event: KeyboardEvent) => {
      if (event.key === "Backspace" && !otpDigits.value[index] && index > 0) {
        const prevInput = document.querySelectorAll("input")[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      }
    };

    return {
      otpDigits,
      handleInput,
      handleKeydown,
    };
  },
});
</script>
