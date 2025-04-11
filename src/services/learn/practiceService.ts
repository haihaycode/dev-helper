import { IVocabulary } from "@/models/IIearnEnglish";

interface PracticeQuestion {
  question: string;
  correctAnswer: string;
  options: string[];
}

export const practiceVoca = (list: IVocabulary[]): PracticeQuestion[] => {
  const validList = list.filter((item) => item.english && item.translate);

  return validList.map((item) => {
    const incorrectAnswers = validList
      .filter((v) => v.translate !== item.translate)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((v) => v.translate as string);
    const options = [...incorrectAnswers, item.translate as string].sort(
      () => Math.random() - 0.5
    );

    return {
      question: item.english as string,
      correctAnswer: item.translate as string,
      options,
    };
  });
};
