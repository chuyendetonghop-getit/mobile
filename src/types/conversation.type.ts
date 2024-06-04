import {UserData} from './auth.type';
import {TPost} from './post.type';
import {TResponse, TResponsePaginate} from './response.type';

export type TConversation = {
  _id: string;
  postId: string;
  participants: [string, string];
  createdAt: Date;
  updatedAt: Date;
};

// --- Get List Conversation ---

export type TConversationItem = TConversation & {
  lastMessage: {
    text: string;
  };
  post: TPost;
  partner: UserData;
};

export type GetListConversationResponse = TResponsePaginate<
  TConversationItem[]
>;

export type GetListConversationParams = {
  page: number;
  limit: number;
};

// --- Get Detail Conversation ---

export type GetDetailConversationResponse = TResponse<
  TConversation & {
    post: TPost;
    partner: UserData;
  }
>;

export type GetDetailConversationParams = {
  conversationId: string;
};
