export interface IBaseModel<T> {
  success: boolean;
  timestamp: string;
  data?: T;
  message?: string;
  error?: string;
}

export interface IBaseModelList<T> {
  success: boolean;
  timestamp: string;
  data?: T[];
  message?: string;
  error?: string;
}
export interface IBaseModelPaged<T> {
  success: boolean;
  timestamp: string;
  data?: T[];
  pageInfo?: IPageInfo<T>;
  message?: string;
  error?: string;
}
export interface IPageInfo<T> {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items?: T[];
}
