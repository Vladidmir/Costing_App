import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface IAuthSlice {
  token: string | null;
}

const initialState: IAuthSlice = {
  token: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, {payload}: PayloadAction<{token: string}>) {
      state.token = payload.token;
      AsyncStorage.setItem('token', payload.token);
    },
    removeUser(state) {
      state.token = null;
      AsyncStorage.removeItem('token');
    },
  },
});

export const {setUser, removeUser} = authSlice.actions;

export default authSlice.reducer;
