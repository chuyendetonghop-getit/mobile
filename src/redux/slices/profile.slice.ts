import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TLocation} from '../../types/location.type';
import {MIN_RADIUS} from '../../utils/constant';

export interface ProfileState {
  location: TLocation | null;
  radius: number;
}

const initialState: ProfileState = {
  location: null,
  radius: MIN_RADIUS,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    signOutProfile: () => {
      return {
        ...initialState,
      };
    },

    setAppLocation: (state, action: PayloadAction<TLocation>) => {
      state.location = action.payload;
    },

    setAppRadius: (state, action: PayloadAction<number>) => {
      state.radius = action.payload;
    },
  },
});

export const {signOutProfile, setAppLocation, setAppRadius} =
  profileSlice.actions;

export const profileReducer = profileSlice.reducer;
