import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import verifyUser from "../API/verifyUser";


export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const response = await verifyUser();
    if (!response.user) return null;

    return { ...response.user, projects: response.projects || [] };
  } catch (error) {
    console.error("fetchUser error:", error);
    return rejectWithValue(error.response?.data || "Failed to fetch user");
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })


      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })


      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || "Failed to verify user";
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
