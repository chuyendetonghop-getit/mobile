import {createSlice} from '@reduxjs/toolkit';
import {authApi} from '../../api/auth/auth.api';
import {User} from '../../types/auth/auth.type';

export interface AuthState {
  isSignedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: state => {
      state.isSignedIn = true;
    },

    signOut: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        console.log('action.payload --> ', action.payload);
        if (action.payload?.success) {
          state.user = action.payload?.data ?? null;
          state.isSignedIn = true;
        }
      },
    );

    builder.addMatcher(
      authApi.endpoints.signUp.matchFulfilled,
      (state, action) => {
        console.log('action.payload --> ', action.payload);
        if (action.payload?.success) {
          state.user = action.payload?.data ?? null;
          state.isSignedIn = true;
        }
      },
    );
  },
});

export const {signIn, signOut} = authSlice.actions;

export const authReducer = authSlice.reducer;
