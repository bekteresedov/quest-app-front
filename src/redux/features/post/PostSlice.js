import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetWithoutAuth, PostWithAuth } from "../../../services/HttpService";

const INITIAL_STATE = {
  loading: false,
  posts: [],
  error: "",
};

export const getPosts = createAsyncThunk("getPosts", async () => {
  const { data } = await GetWithoutAuth("/posts/getAll");
  return data;
});
export const savePost = createAsyncThunk("savePost", async (body) => {
    await PostWithAuth("posts/new",body);
});
export const postSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = true;
    });
  },
});

export default postSlice.reducer;
