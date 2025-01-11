export interface BaseModel<T> {
  success: boolean;
  timestamp: string;
  data?: T;
  message?: string;
  error?: string;
}
