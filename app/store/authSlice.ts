import { createSlice } from "@reduxjs/toolkit"

export interface AuthState {
  currentUser: {
    user: any
    token: string
    loading: boolean
  }
}

const initialState: AuthState = {
  currentUser: {
    user: null,
    token: "",
    loading: false,
  },
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = {
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions

export default authSlice.reducer
