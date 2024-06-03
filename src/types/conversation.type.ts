export type TConversation = {
  _id: string;
  postId: string;
  participants: [string, string];
  createdAt: Date;
  updatedAt: Date;
};
