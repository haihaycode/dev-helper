<template>
  <LearnEnglishPagePatternLayout :title="'Practice Vocabulary'">
    <template #content>
      <div v-if="questions.length && currentQuestion">
        <div
          class="p-6 rounded-2xl shadow-sm bg-white relative animate-fade-in transition-all duration-500"
        >
          <!-- Timer + Score -->
          <div class="absolute top-4 right-6 text-right text-sm text-gray-500">
            ⏰ <span class="font-bold text-red-500">{{ timeLeft }}s</span><br />
            ⭐ Điểm :
            <span class="text-green-600"
              >{{ score }}/{{ questions.length }}</span
            >
          </div>

          <!-- Câu hỏi -->
          <div class="mb-4">
            <div class="text-sm text-gray-500 mb-1">
              Câu {{ currentIndex + 1 }}
            </div>
            <div class="text-xl font-bold text-gray-800 tracking-wide">
              {{ upperCase(currentQuestion.question) }}
            </div>
          </div>

          <!-- Các lựa chọn -->
          <div class="space-y-3">
            <button
              v-for="option in currentQuestion.options"
              :key="option"
              class="w-full text-left px-4 py-3 rounded-xl border bg-white shadow hover:shadow-md transition-all duration-300"
              :class="getOptionClass(option)"
              :disabled="!!selectedAnswer || isTimeUp"
              @click="selectAnswer(option)"
            >
              {{ option }}
            </button>
          </div>

          <!-- Nút tiếp theo -->
          <div v-if="selectedAnswer || isTimeUp" class="mt-6 text-right">
            <button
              class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              @click="goToNextQuestion"
            >
              {{ isLastQuestion ? "🎉 Kết thúc" : "Câu tiếp theo" }}
            </button>
          </div>
        </div>
      </div>
      <!-- Nếu không có dữ liệu -->
      <div v-else class="text-center text-gray-400 mt-12 animate-fade-in">
        Không có dữ liệu luyện tập.
      </div>
    </template>
  </LearnEnglishPagePatternLayout>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import LearnEnglishPagePatternLayout from "../LearnEnglishPagePatternLayout.vue";
import { IVocabulary } from "@/models/IIearnEnglish";
import { practiceVoca } from "@/services/learn/practiceService";
import { shuffle, upperCase } from "lodash";

const STORAGE_KEY = "selected_vocabularies";
const questions = ref(practiceVoca(shuffle(getStoredVocabularies())));
const currentIndex = ref(0);
const selectedAnswer = ref<string | null>(null);
const score = ref(0);
const timeLeft = ref(10);
const timer = ref<number | null>(null);
const isTimeUp = ref(false);

function getStoredVocabularies(): IVocabulary[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const currentQuestion = computed(() => questions.value[currentIndex.value]);
const isLastQuestion = computed(
  () => currentIndex.value === questions.value.length - 1
);

const selectAnswer = (option: string) => {
  if (selectedAnswer.value || isTimeUp.value) return;
  selectedAnswer.value = option;
  if (option === currentQuestion.value.correctAnswer) {
    score.value++;
  }
  stopTimer();
};

const getOptionClass = (option: string) => {
  if (!selectedAnswer.value && !isTimeUp.value)
    return "bg-white hover:bg-gray-100";

  const isCorrect = option === currentQuestion.value.correctAnswer;
  const isSelected = option === selectedAnswer.value;

  if (isTimeUp.value && isCorrect)
    return "bg-green-100 border-green-400 text-green-700";
  if (isSelected && isCorrect)
    return "bg-green-100 border-green-400 text-green-700";
  if (isSelected && !isCorrect) return "bg-red-100 border-red-400 text-red-700";
  if (isCorrect) return "bg-green-100 border-green-400 text-green-700";

  return "bg-white";
};

const goToNextQuestion = () => {
  if (!isLastQuestion.value) {
    currentIndex.value++;
    selectedAnswer.value = null;
    isTimeUp.value = false;
    timeLeft.value = 10;
    startTimer();
  } else {
    alert(
      `Hoàn thành! Điểm số của bạn: ${score.value}/${questions.value.length}`
    );
  }
};

const startTimer = () => {
  stopTimer();
  timer.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      isTimeUp.value = true;
      stopTimer();
    }
  }, 1000);
};

const stopTimer = () => {
  if (timer.value) clearInterval(timer.value);
};

onMounted(() => {
  if (questions.value.length) {
    startTimer();
  }
});

onUnmounted(() => {
  stopTimer();
});
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>
