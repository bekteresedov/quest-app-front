import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/auth/AuthSlice";
import CommentReducer from "./features/comment/CommentSlice";
import PostReducer from "./features/post/PostSlice";

export const store = configureStore({
    reducer: {
      posts: PostReducer,
      comments:CommentReducer,
      users:AuthReducer
    },
  })