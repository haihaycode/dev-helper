import { IBaseModelPaged, IPageInfo } from "./base";
import { IOrderBy } from "./IPagination";
export interface IVocabulary {
  id?: number;
  english?: string;
  translate?: string;
  image?: string;
  example_sentence?: string;
  user_id?: number;
  is_deleted?: boolean;
  slug?: string;
}

export interface IVocabularyRequest {
  page?: number;
  pageSize?: number;
  query?: string;
  is_deleted?: false | true;
  orderBy?: IOrderBy;
}

export type IVocabulariesResponse = IBaseModelPaged<IPageInfo<IVocabulary>>;
// Compare this snippet from src/models/IVocabulary.ts:
