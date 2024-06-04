import {TResponsePaginate} from './response.type';

export type TMessage = {
  _id: string;
  originId: string;
  conversationId: string;
  senderId: string;
  text?: string;
  media?: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type GetListMessageResponse = TResponsePaginate<TMessage[]>;

export type GetListMessageParams = {
  receiverId: string;
  postId: string;
  page: number;
  limit: number;
};
