import {HttpStatusCode} from 'axios';

export type TResponse<T = undefined> = {
  data?: T;
  success: boolean;
  code: HttpStatusCode;
  message: string;
};

export type TPaging<T = []> = {
  docs: T;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type TResponsePaginate<T = []> = {
  data: TPaging<T>;
  success: boolean;
  code: HttpStatusCode;
  message: string;
};
