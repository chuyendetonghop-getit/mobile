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
