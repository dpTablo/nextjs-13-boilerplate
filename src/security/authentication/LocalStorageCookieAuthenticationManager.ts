import { AuthenticationManager } from './AuthenticationManager';
import { Credentials } from './Credentials';
import { AxiosFactory } from '../../http/axios/AxiosFactory';
import { DefaultAuthenticationService } from '@service/auth/DefaultAuthenticationService';
import { AxiosInstanceType } from '../../http/axios/AxiosInstanceType';
import { AuthenticationService } from '@service/auth/AuthenticationService';
import { clientCookieManagerProvider } from '@cookie/client/ClientCookieManagerProvider';

export class LocalStorageCookieAuthenticationManager implements AuthenticationManager {
    private LOCAL_STORAGE_KEY = 'dptablo_credentials';

    private authenticationService: AuthenticationService;

    constructor() {
        const axiosFactory = new AxiosFactory();
        this.authenticationService = new DefaultAuthenticationService();
        this.authenticationService.setAxiosInstance(
            axiosFactory.getDefaultAxiosInstance(AxiosInstanceType.AUTHENTICATION)
        );
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
