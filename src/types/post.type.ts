import {TCategoryItem} from './category.type';
import {TLocationPost} from './location.type';
import {TResponsePaginate} from './response.type';
import {TStatusItem} from './status.type';

export type TPost = {
  _id: string;
  userId: string;
  location: TLocationPost;
  category: TCategoryItem;
  images: string[];
  title: string;
  price: string;
  status: TStatusItem;
  description: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type TPostCreate = Omit<TPost, '_id' | 'createdAt' | 'updatedAt'>;
export type TPostUpdate = Partial<TPostCreate>;

export type GetListPostResponse = TResponsePaginate<TPost[]>;
export type GetListPostParams = {
  lon: number;
  lat: number;
  radius: number;
  page: number;
  limit: number;
  title?: string;
  categoryId?: string;
  statusId?: string;
};
