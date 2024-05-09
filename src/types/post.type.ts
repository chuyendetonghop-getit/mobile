import {TCategoryItem} from './category.type';
import {TLocationPost} from './location.type';
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
};

export type TPostCreate = Omit<TPost, '_id'>;
export type TPostUpdate = Partial<TPostCreate>;
