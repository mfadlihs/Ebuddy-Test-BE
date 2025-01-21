import { HttpCode } from '../constants';

export interface ValidationType {
  fields: string[];
  constraint: string;
}

export interface BaseResponse {
  status: 'success' | 'error';
  statusCode: HttpCode;
  message: string;
}

export interface SuccessResponse<T> extends BaseResponse {
  data?: T;
}

export interface ErrorResponse extends BaseResponse {
  name: string;
  errors?: AppErrorContent[];
  stack?: string;
}

export interface AppErrorContent {
  message: string;
  code: string;
  details?: string;
}
