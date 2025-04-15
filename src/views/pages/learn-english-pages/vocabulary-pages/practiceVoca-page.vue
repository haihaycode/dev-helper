<template>
  <LearnEnglishPagePatternLayout :title="'Practice Vocabulary'">
    <template #content>
      <transition name="fade" mode="out-in">
        <div v-if="isBreakTime" class="text-center p-8">
          <div
            class="bg-gradient-to-br from-blue-500 to-gray-600 text-white p-8 rounded-2xl shadow-lg"
          >
            <h2 class="text-3xl font-bold mb-4">🎉 Nghỉ giải lao!</h2>
            <p class="text-xl mb-4">
              Bạn đã hoàn thành {{ currentIndex + 1 }} câu hỏi
            </p>
            <div class="text-4xl font-bold text-yellow-300">
              {{ breakTimeLeft }}s
            </div>
          </div>
        </div>
        <div v-else-if="questions.length && currentQuestion">
          <div
            class="p-6 rounded-2xl shadow-sm bg-white animate-fade-in transition-all duration-500"
          >
            <!-- Timer + Score -->
            <div
              class="flex w-full items-end justify-end text-sm text-gray-500 space-x-2"
            >
              <p class="text-blue-700 text-sm">Score : {{ score }}</p>
              <div class="relative w-12 h-12">
                <svg class="w-full h-full transform -rotate-90">
                  <circle
                    class="text-gray-200"
                    stroke-width="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="20"
                    cx="24"
                    cy="24"
                  />
                  <circle
                    class="text-red-500"
                    stroke-width="4"
                    stroke-dasharray="125.6"
                    :stroke-dashoffset="125.6 - (timeLeft / 10) * 125.6"
                    stroke-linecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="20"
                    cx="24"
                    cy="24"
                  />
                </svg>
                <span
                  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-red-500 text-xl"
                >
                  {{ timeLeft }}
                </span>
              </div>
            </div>

            <div class="text-xl mb-1 font-bold text-gray-800 tracking-wide">
              {{ upperCase(currentQuestion.question) }}
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

            <div class="mb-2 px-2 mt-1">
              <div
                class="text-blue-500 text-left py-1 rounded-full text-sm font-medium shadow-sm"
              >
                {{ currentIndex + 1 }} / {{ questions.length }}
              </div>
              <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-gray-400 to-blue-600 transition-all duration-500 ease-in-out"
                  :style="{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  }"
                ></div>
              </div>
            </div>

            <!-- Nút tiếp theo -->
            <div
              v-if="(selectedAnswer || isTimeUp) && !isLoading"
              class="mt-6 text-right"
            >
              <button
                class="bg-gradient-to-br from-blue-600 to-gray-600 text-white shadow-md p-2 rounded-md"
                @click="goToNextQuestion"
              >
                {{
                  isLastQuestion
                    ? "🎉 Kết thúc"
                    : `Tiếp tục (${nextQuestionCountdown}s)`
                }}
              </button>
            </div>

            <!-- Hiển thị thông tin từ điển sau khi trả lời -->
            <div v-if="selectedAnswer || isTimeUp" class="mt-6 border-t pt-4">
              <div v-if="isLoading" class="space-y-2">
                <a-card
                  :loading="isLoading"
                  :hoverable="false"
                  class="border-none"
                />
              </div>

              <div v-else-if="dictionaryData" class="space-y-2">
                <!-- Phát âm -->
                <div class="p-2 rounded-lg">
                  <div class="flex flex-wrap gap-2">
                    <div
                      v-for="(phonetic, index) in dictionaryData.phonetics"
                      :key="index"
                      class="flex items-center space-x-2 bg-white p-2 rounded-md shadow-sm"
                    >
                      <span v-if="phonetic.text" class="text-gray-700">{{
                        phonetic.text
                      }}</span>
                      <button
                        v-if="phonetic.audio"
                        @click="playAudio(phonetic.audio)"
                        class="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        <SoundOutlined
                          class="text-blue-600 flex items-center"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Nghĩa -->
                <div
                  v-for="(meaning, index) in dictionaryData.meanings"
                  :key="index"
                  class="p-2 rounded-lg"
                >
                  <h3 class="text-lg font-semibold text-blue-900 mb-2">
                    {{ meaning.partOfSpeech.toUpperCase() }}
                  </h3>
                  <div class="space-y-3">
                    <div
                      v-for="(def, defIndex) in meaning.definitions"
                      :key="defIndex"
                      class="p-2 rounded-md shadow-sm"
                    >
                      <p class="text-gray-700">{{ def.definition }}</p>
                      <p v-if="def.example" class="text-gray-600 italic mt-1">
                        {{ i18n.global.t("dictionary.example") }} :
                        {{ def.example }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-400 mt-12 animate-fade-in">
          Không có dữ liệu luyện tập.
        </div>
      </transition>
    </template>
  </LearnEnglishPagePatternLayout>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import LearnEnglishPagePatternLayout from "../LearnEnglishPagePatternLayout.vue";
import { IVocabulary } from "@/models/IIearnEnglish";
import { practiceVoca } from "@/services/learn/practiceService";
import { shuffle, upperCase } from "lodash";
import { SoundOutlined } from "@ant-design/icons-vue";
import { getVocabularyByDictionary } from "@/api/dictionaryApi";
import { IDictionaryEntry } from "@/models/IDictionaryEntry";
import i18n from "@/services/i18n";
import correctSound from "@/assets/audio/correct-6033.mp3";
import wrongSound from "@/assets/audio/error-5-199276.mp3";

const STORAGE_KEY = "selected_vocabularies";
const questions = ref(practiceVoca(shuffle(getStoredVocabularies())));
const currentIndex = ref(0);
const selectedAnswer = ref<string | null>(null);
const score = ref(0);
const timeLeft = ref(10);
const timer = ref<number | null>(null);
const isTimeUp = ref(false);
const dictionaryData = ref<IDictionaryEntry | null>(null);
const isLoading = ref(false);
const nextQuestionCountdown = ref(10);
const nextQuestionTimer = ref<number | null>(null);
const isBreakTime = ref(false);
const breakTimeLeft = ref(5);
const breakTimer = ref<number | null>(null);

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

const playAudio = (audioUrl: string) => {
  const audio = new Audio(audioUrl);
  audio.play();
};

const getInfo = async (word: string) => {
  try {
    isLoading.value = true;
    const response = await getVocabularyByDictionary(word);
    if (response && response.length > 0) {
      dictionaryData.value = response[0];
      // Tự động phát âm thanh đầu tiên nếu có
      const firstAudio = dictionaryData.value.phonetics.find((p) => p.audio);
      if (firstAudio?.audio) {
        playAudio(firstAudio.audio);
      }
    }
  } catch (error) {
    dictionaryData.value = null;
  } finally {
    isLoading.value = false;
  }
};

const playResultSound = (isCorrect: boolean) => {
  const audio = new Audio(isCorrect ? correctSound : wrongSound);
  audio.play();
};

const selectAnswer = (option: string) => {
  if (selectedAnswer.value || isTimeUp.value) return;
  selectedAnswer.value = option;
  const isCorrect = option === currentQuestion.value.correctAnswer;
  if (isCorrect) {
    // Tính điểm dựa trên thời gian còn lại
    // Thời gian càng nhiều điểm càng cao, tối đa 1000 điểm
    const maxTime = 10; // Thời gian tối đa cho mỗi câu
    const maxScore = 1000; // Điểm tối đa cho mỗi câu
    const timeBonus = Math.floor((timeLeft.value / maxTime) * maxScore);
    score.value += timeBonus;
  }
  // Phát âm thanh kết quả
  playResultSound(isCorrect);
  stopTimer();
  // Gọi API lấy thông tin từ điển sau khi trả lời
  getInfo(currentQuestion.value.question);
  // Bắt đầu đếm ngược cho câu tiếp theo
  startNextQuestionCountdown();
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
  stopNextQuestionCountdown();
  if (!isLastQuestion.value) {
    currentIndex.value++;
    selectedAnswer.value = null;
    isTimeUp.value = false;
    timeLeft.value = 10;
    startTimer();

    // Kiểm tra nếu đã trả lời đủ 5 câu
    if ((currentIndex.value + 1) % 5 === 0) {
      startBreak();
    }
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

const startNextQuestionCountdown = () => {
  nextQuestionCountdown.value = 10;
  nextQuestionTimer.value = setInterval(() => {
    if (nextQuestionCountdown.value > 0) {
      nextQuestionCountdown.value--;
    } else {
      goToNextQuestion();
    }
  }, 1000);
};

const stopNextQuestionCountdown = () => {
  if (nextQuestionTimer.value) {
    clearInterval(nextQuestionTimer.value);
    nextQuestionTimer.value = null;
  }
};

const startBreak = () => {
  isBreakTime.value = true;
  breakTimeLeft.value = 5;
  breakTimer.value = setInterval(() => {
    if (breakTimeLeft.value > 0) {
      breakTimeLeft.value--;
    } else {
      endBreak();
    }
  }, 1000);
};

const endBreak = () => {
  if (breakTimer.value) {
    clearInterval(breakTimer.value);
    breakTimer.value = null;
  }
  isBreakTime.value = false;
  goToNextQuestion();
};

onMounted(() => {
  if (questions.value.length) {
    startTimer();
  }
});

onUnmounted(() => {
  stopTimer();
  stopNextQuestionCountdown();
});
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}

circle {
  transition: stroke-dashoffset 1s linear;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
