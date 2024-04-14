export default {
  //Auth
  signInWithEmailPassword: 'auth/login',
  signInSocial: 'auth/login-social',
  signUpUrl: 'auth/signup',
  login: 'auth/local/',
  logOut: 'auth/logout',
  recoverPassword: 'auth/forgot-password',
  resetPassword: 'auth/reset-password',
  verifySignUp: 'auth/verify-signup',
  verifyResetPassword: 'auth/verify-forgot-password',
  resendVerifyCode: 'auth/resend-otp-code',

  //Account
  getProfile: 'users/profile',
  inActiveUser: '/users/profile/toggle-active',
  verifyActive: '/auth/verify-login-active',
  changePassword: 'auth/change-password',
  activityLog: 'activity-logs/profile',
  transactionHistory: 'transaction-histories',
  packageForUser: 'packages/user',
  deleteAccount: '/users/verify-delete-profile',

  //delivery address
  deliveryAddress: 'delivery-addresses',

  // post
  uploadMedia: 'media',
  uploadMediaPost: 'media/post-media',

  //personalize board
  personalizeBoard: '/personalization-boards',
  loginDevice: 'devices/login',
  //chat

  listRooms: 'chat-rooms/user',
  listUsers: 'users/profiles',
  unreadNumber: 'chat-rooms/user/unread-number',
  chatRoomMembers: 'chat-rooms/user-rooms',
  checkUserInChatRoom: 'chat-rooms/user/check',
  getMessages: '/messages/user',
  uploadChatMedia: 'media/chat-media',
  markAsRead: 'chat-rooms/user/mark-status',
  deleteMessages: 'messages/user',
  chatRoomMedia: 'chat-rooms/user/media',
  removeUserFromChatRoom: 'chat-rooms/remove',
  leaveChatRoom: 'chat-rooms/leave-chat-room',
  assignNewHost: 'chat-rooms/assign-host',
  inviteFriend: 'chat-rooms/friends-available-invite',
  joinChatRoom: 'chat-rooms/join-chat-room',
  cancelRequestJoin: 'chat-rooms/cancel-join-chat-room',
  acceptJoinChatRoom: 'chat-rooms/accept',
  denyJoinChatRoom: 'chat-rooms/deny',

  //profile
  getFriends: 'users/friends',
  unFriend: 'users/unfriend',
  getFriendRequests: 'users/friend-requests',
  acceptFriendRequest: 'users/accept-friend-request',
  denyFriendRequest: 'users/deny-friend-request',
  getFriendsAvailableInvite: 'users/friends-available-invite',
  sendRequest: 'users/send-friend-request',
  cancelRequest: 'users/cancel-friend-request',

  // community
  getPosts: 'user-posts',
  reactions: 'reactions',
  getComments: 'comments',

  // get categories
  getCategories: 'categories',
  getNumberReactionsCommens: 'user-posts/reactions',

  // get profile media by id
  getProfileMedias: 'users/profile-media',

  // Habit
  getHealthTracker: 'health-trackers',
  getHealthTrackerList: 'health-trackers/list',
  getHealthTrackerStatistic: 'health-trackers/statistic',
  getChallenges: 'challenges/profile',
  getChallengesSubcribed: 'challenges/profile/subscribed',
  getListTodo: 'daily-routines/profile/subscribed',
  job: 'daily-routines/profile',
  jobDetail: 'jobs',

  getHSleepStatistic: 'health-trackers/statistic-hours-of-sleep',

  // Challenges
  getChallengesStatistic: 'challenges/profile/statistic',
  getGoals: 'goals/profile',
  getChallengeDetailById: 'challenges/profile',
  getMissions: 'missions/profile',

  getGoalQuestion: 'first-questions/profile',
  // Check default package (Free package)
  checkDefaultPackage: 'packages/check-default-package',
  userPostChallenges: 'user-posts/challenges',

  // nootification
  notification: 'notifications/profile',
  readNotification: 'notifications',
  unreadNotification: 'notifications/unread-number',

  // daily routine
  getStartingScren: 'starting-screens/profile',
  getDefaultDailyRoutine: 'daily-routines/default',
  subcribeDailyRoutine: 'daily-routines/profile',

  // jobs
  getJobsProfile: 'jobs/profile',

  //discover
  getBlogs: 'posts/profile',
};
