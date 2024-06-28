import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  mode: localStorage.getItem("mode") || "light",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", state.mode);
    },
    setLogin: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLogout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { toggleMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
