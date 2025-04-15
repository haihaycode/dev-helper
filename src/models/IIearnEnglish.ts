import { IBaseModelPaged, IPageInfo } from "./base";

export interface IVocabulary {
  id?: number;
  english?: string;
  translate?: string;
  image?: string;
  example_sentence?: string;
  user_id?: number;
  is_deleted?: boolean;
  slug?: string;
  tags?: string;
  notes?: string;
  is_special?: boolean;
  updated_at?: string;
  created_at?: string;
}

export interface IVocabularyRequest {
  query?: string;
  page?: number;
  pageSize?: number;
  is_deleted?: boolean;
  orderBy?: {
    column?: string;
    order?: string;
  };
  startDate?: string;
  endDate?: string;
}

export type IVocabulariesResponse = IBaseModelPaged<IPageInfo<IVocabulary>>;
// Compare this snippet from src/models/IVocabulary.ts:
