import { AuthenticationManager } from './AuthenticationManager';
import { AuthenticationService } from '@service/auth/AuthenticationService';
import { AxiosFactory } from '../../http/axios/AxiosFactory';
import { DefaultAuthenticationService } from '@service/auth/DefaultAuthenticationService';
import { AxiosInstanceType } from '../../http/axios/AxiosInstanceType';
import { serverCookieManagerProvider } from '@cookie/server/ServerCookieManagerProvider';
import { Credentials } from './Credentials';

export class ServerCookieAuthenticationManager implements AuthenticationManager {
    private credentialsCookieManager = serverCookieManagerProvider.credentialsCookieManager;

    private authenticationService: AuthenticationService;

    constructor() {
        const axiosFactory = new AxiosFactory();
        this.authenticationService = new DefaultAuthenticationService();
        this.authenticationService.setAxiosInstance(
            axiosFactory.getDefaultAxiosInstance(AxiosInstanceType.AUTHENTICATION)
        );
    }

    async getCredentials(): Promise<Credentials | undefined> {
        return this.credentialsCookieManager.getCookie();
    }

    async refreshSign(): Promise<Credentials | undefined> {
        throw new Error('not supported');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signIn(userId: string, password: string): Promise<Credentials | undefined> {
        throw new Error('not supported');
    }

    async signOut(): Promise<Credentials | undefined> {
        throw new Error('not supported');
    }
}
