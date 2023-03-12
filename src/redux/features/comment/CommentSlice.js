import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetWithoutAuth, PostWithAuth } from "../../../services/HttpService";

const INITIAL_STATE = {
  comments: [],
  loading: false,
  error: "",
};

export const getComments = createAsyncThunk("getComments", async (postId) => {
  const { data } = await GetWithoutAuth("/comments?postId=" + postId);
  return data;
});
export const saveComment = createAsyncThunk(
  "saveComment",
  async (body, { rejectWithValue }) => {
    try {
      await PostWithAuth("/comments/new", body);
    } catch (error) {
      return rejectWithValue("Error!")
    }
  }
);
export const commentSlice = createSlice({
  name: "comments",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = true;
    });
  },
});

export default commentSlice.reducer;
