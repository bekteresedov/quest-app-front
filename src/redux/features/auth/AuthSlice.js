import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetWithoutAuth, PostWithAuth } from "../../../services/HttpService";

const INITIAL_STATE = {
  loading: false,
  error: "",
};

export const loginUser = createAsyncThunk("loginUser", async (body) => {
  const { data } = await PostWithAuth("/auth/login", body);
  localStorage.setItem("tokenKey", data.accessToken);
  localStorage.setItem("currentUser", data.userId);
  localStorage.setItem("userName", body.userName);
});

export const registerUser = createAsyncThunk("registerUser", async (body) => {
  const { data } = await PostWithAuth("/auth/register", body);
  localStorage.setItem("tokenKey", data.accessToken);
  localStorage.setItem("currentUser", data.userId);
  localStorage.setItem("userName", body.userName);
});
export const AuthSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = true;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = true;
    });
  },
});

export default AuthSlice.reducer;
