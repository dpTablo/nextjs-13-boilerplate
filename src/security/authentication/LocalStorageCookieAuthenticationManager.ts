import { AuthenticationManager } from './AuthenticationManager';
import { Credentials } from './Credentials';
import { DefaultAuthenticationService } from '@service/auth/DefaultAuthenticationService';
import { AuthenticationService } from '@service/auth/AuthenticationService';
import { clientCookieManagerProvider } from '@cookie/client/ClientCookieManagerProvider';
import { AuthenticationAxiosProvider } from '../../http/axios/provider/AuthenticationAxiosProvider';

export class LocalStorageCookieAuthenticationManager implements AuthenticationManager {
    private LOCAL_STORAGE_KEY = 'dptablo_credentials';

    private authenticationService: AuthenticationService;

    constructor() {
        this.authenticationService = new DefaultAuthenticationService();

        const axiosProvider = new AuthenticationAxiosProvider();
        this.authenticationService.setAxiosProvider(axiosProvider);
    }

    async getCredentials(): Promise<Credentials | undefined> {
        const jsonString = localStorage.getItem(this.LOCAL_STORAGE_KEY);
        if (!jsonString) {
            return undefined;
        }

        return JSON.parse(jsonString) as Credentials;
    }

    async refreshSign(): Promise<Credentials | undefined> {
        const credentials = await this.getCredentials();
        if (!credentials) throw new Error('credentials undefined.');

        const refreshedCredentials = await this.authenticationService.refresh({
            userEmail: credentials.userEmail,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
            expires: 200000,
        });
        this.saveCredentials(credentials);
        return refreshedCredentials;
    }

    async signIn(userId: string, password: string): Promise<Credentials | undefined> {
        const credentials = await this.authenticationService.login(userId, password);
        this.saveCredentials(credentials);
        return credentials;
    }

    async signOut(): Promise<Credentials | undefined> {
        return Promise.resolve(undefined);
    }

    private saveCredentials(credentials: Credentials) {
        this.setCredentialsToLocalStorage(credentials);
        clientCookieManagerProvider.credentialsCookieManager.setCookie(credentials);
    }

    private setCredentialsToLocalStorage(credentials: Credentials) {
        const jsonString = JSON.stringify(credentials);
        localStorage.setItem(this.LOCAL_STORAGE_KEY, jsonString);
    }

    private removeCredentialsInLocalStorage() {
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
    }
}
