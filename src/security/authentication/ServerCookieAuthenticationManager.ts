import { AuthenticationManager } from './AuthenticationManager';
import { AuthenticationService } from '@service/auth/AuthenticationService';
import { DefaultAuthenticationService } from '@service/auth/DefaultAuthenticationService';
import { serverCookieManagerProvider } from '@cookie/server/ServerCookieManagerProvider';
import { Credentials } from './Credentials';
import { AuthenticationAxiosProvider } from '../../http/axios/provider/AuthenticationAxiosProvider';

export class ServerCookieAuthenticationManager implements AuthenticationManager {
    private credentialsCookieManager = serverCookieManagerProvider.credentialsCookieManager;

    private authenticationService: AuthenticationService;

    constructor() {
        this.authenticationService = new DefaultAuthenticationService();

        const axiosProvider = new AuthenticationAxiosProvider();
        this.authenticationService.setAxiosProvider(axiosProvider);
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
