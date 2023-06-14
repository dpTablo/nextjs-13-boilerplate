import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Credentials } from '../../security/authentication/Credentials';

export interface CredentialsState {
    credentialsId: string;
    credentials: Credentials | undefined;
}

const initialState: CredentialsState = {
    credentialsId: '',
    credentials: undefined,
};

export const credentialsSlice = createSlice({
    name: 'credentialsList',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<Credentials>) => {
            state.credentialsId = action.payload.id;
            state.credentials = action.payload;
        },
        removeCredentials: (state) => {
            state.credentialsId = initialState.credentialsId;
            state.credentials = initialState.credentials;
        },
    },
});

export const { setCredentials, removeCredentials } = credentialsSlice.actions;
export default credentialsSlice.reducer;
