import { IBaseModelPaged, IPageInfo } from "./base";
import { IOrderBy } from "./IPagination";

export interface INote {
  id: number;
  title: string;
  detail: string;
  notes: string;
  user_id: number;
  is_deleted: boolean;
  slug: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

export interface INoteRequest {
  page?: number;
  pageSize?: number;
  query?: string;
  is_deleted?: boolean;
  is_public?: boolean;
  orderBy?: IOrderBy;
}

export type INotesResponse = IBaseModelPaged<IPageInfo<INote>>;
