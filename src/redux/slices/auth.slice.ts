import {PayloadAction, createSlice} from '@reduxjs/toolkit';
// import {SignUpResponse} from 'types';

export interface AuthState {
  isSignedIn: boolean;
  token: string | null;
  // user: UserData | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.isSignedIn = true;
      state.token = action.payload;
    },

    signOut: state => {
      return {
        ...initialState,
      };
    },

    // signUp: (state, action: PayloadAction<SignUpResponse>) => {
    //   if (action.payload.data) {
    //     state.isSignedIn = true;
    //     state.token = action.payload.data?.token;
    //   }
    // },
  },
  extraReducers: builder => {
    // builder.addMatcher(
    //   authApi.endpoints.signInWithEmailPassword.matchFulfilled,
    //   (state, action) => {
    //     if (action.payload.data && !action.payload.data.data) {
    //       state.token = action.payload.data?.token;
    //       state.user = action.payload.data.user;
    //       state.isSignedIn = true;
    //       state.isSelectedPersonalizeBoard =
    //         !!action.payload.data.user.personalizationBoard;
    //     }
    //   },
    // );
  },
});

export const {signIn, signOut} = authSlice.actions;

export const authReducer = authSlice.reducer;
