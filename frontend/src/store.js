import { configureStore } from "@reduxjs/toolkit";
import { likeOrCommentReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";
import { allUsersReducer, postOfFollowingReducer, userProfileReducer, userReducer } from "./Reducers/User";

const store = configureStore({
   reducer: {
      user: userReducer,
      postOfFollowing: postOfFollowingReducer,
      allUsers: allUsersReducer,
      like: likeOrCommentReducer,
      myPosts: myPostsReducer,
      userProfile: userProfileReducer,
      userPosts: userPostsReducer
   }
});

export default store;
