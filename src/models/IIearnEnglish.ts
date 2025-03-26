import { IBaseModelPaged } from "./base";
export interface IVocabulary {
  id?: number;
  english: string;
  translate: string;
  image?: string;
  example_sentence?: string;
}
export type IListVocabularyResponse = IBaseModelPaged<IVocabulary>;
// Compare this snippet from src/models/IVocabulary.ts:
