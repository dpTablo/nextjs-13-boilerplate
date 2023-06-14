import { AuthenticationManager } from './AuthenticationManager';
import { Credentials } from './Credentials';
import { useAppDispatch } from '@redux/hooks';
import { setCredentials, removeCredentials } from '@redux/authentication/credentialsSlice';
import { AuthService } from '@service/auth/AuthService';
import { DefaultAuthService } from '@service/auth/DefaultAuthService';
import { TypedUseSelectorHook } from 'react-redux';
import { RootState } from '@redux/store';
import { clientCookieManagerProvider } from '@cookie/client/ClientCookieManagerProvider';

export class ReduxCookieAuthenticationManager implements AuthenticationManager {
    private dispatch = useAppDispatch();

    private useAppSelector: TypedUseSelectorHook<RootState>;

    private authService: AuthService = new DefaultAuthService();

    constructor(useAppSelector: TypedUseSelectorHook<RootState>) {
        this.useAppSelector = useAppSelector;
    }

    async getCredentials(): Promise<Credentials | undefined> {
        return this.useAppSelector((state) => state.credentialsReducer.credentials);
    }

    async signIn(userId: string, password: string): Promise<Credentials | undefined> {
        const userAuthentication = await this.authService.login(userId, password);

        const credentials: Credentials = {
            id: userAuthentication.userEmail,
            userEmail: userAuthentication.userEmail,
            userId: userAuthentication.userEmail,
            accessToken: userAuthentication.accessToken,
            refreshToken: userAuthentication.refreshToken,
        };

        clientCookieManagerProvider.credentialsCookieManager.setCookie(credentials);
        this.dispatch(setCredentials(credentials));

        return credentials;
    }

    async signOut(): Promise<Credentials | undefined> {
        const credentials = this.useAppSelector((state) => state.credentialsReducer.credentials);

        clientCookieManagerProvider.credentialsCookieManager.deleteCookie();
        this.dispatch(removeCredentials());
        return credentials;
    }
}
