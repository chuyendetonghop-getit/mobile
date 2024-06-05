export enum ESocketEvents {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  CONNECTION_ERROR = 'connection_error',
  CHAT_JOIN_CONVERSATION = 'chatJoinConversation',
  CHAT_LEAVE_CONVERSATION = 'chatLeaveConversation',
  CHAT_SEND_MESSAGE = 'chatSendMessage',
  CHAT_RECEIVE_MESSAGE = 'chatReceiveMessage',
  // event for changing conversation in chat screen
  CHAT_SUBSCRIBE_CONVERSATION_CHANGE = 'chatSubscribeConversationChange',
  CHAT_UNSUBSCRIBE_CONVERSATION_CHANGE = 'chatUnsubscribeConversationChange',
  CHAT_CONVERSATION_CHANGE = 'chatConversationChange',
}
