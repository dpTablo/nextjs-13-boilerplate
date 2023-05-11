import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAuthentication } from '@model/service/auth/UserAuthentication';

export interface UserAuthenticationState {
    value: UserAuthentication | undefined;
}

const initialState: UserAuthenticationState = {
    value: undefined,
};

export const userAuthenticationSlice = createSlice({
    name: 'userAuthentication',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserAuthentication>) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = undefined;
        },
    },
});

export const { login, logout } = userAuthenticationSlice.actions;

export default userAuthenticationSlice.reducer;
