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
  success?: boolean;
  timestamp?: string;
  data?: T;
  message?: string;
  error?: string;
}
export interface IPageInfo<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  results?: T[];
}
