import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import RouteName from '../../navigation/RouteName';

export interface AppState {
  currentScreen: RouteName;
  hasNotification: boolean;
}

const initialState: AppState = {
  currentScreen: RouteName.HOME,
  hasNotification: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentScreen: (state, action: PayloadAction<RouteName>) => {
      state.currentScreen = action.payload;
    },
    setNotification: (state, action: PayloadAction<boolean>) => {
      state.hasNotification = action.payload;
    },
  },
});

export const {setCurrentScreen, setNotification} = appSlice.actions;

export const appReducer = appSlice.reducer;
