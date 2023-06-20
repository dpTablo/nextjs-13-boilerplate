import { AxiosInstance } from 'axios';

import { UserAuthentication } from '@model/service/auth/UserAuthentication';
import { AuthenticationService } from '@service/auth/AuthenticationService';
import { userAuthenticationFactory } from '@model/service/auth/UserAuthenticationFactory';
import { Credentials } from '../../security/authentication/Credentials';

export class DefaultAuthenticationService implements AuthenticationService {
    private axiosInstance!: AxiosInstance;

    setAxiosInstance(axiosInstance: AxiosInstance): void {
        this.axiosInstance = axiosInstance;
    }

    async login(userId: string, password: string): Promise<Credentials> {
        const params = new URLSearchParams();
        params.append('userId', userId);
        params.append('password', password);

        const response = await this.axiosInstance({
            method: 'post',
            url: '/auth/login',
            data: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            responseType: 'json',
        });

        const userAuthentication = userAuthenticationFactory.createFromSerializeObject(response.data);
        return this.createCredentials(userAuthentication);
    }

    async refresh(userAuthentication: UserAuthentication): Promise<Credentials> {
        const params = new URLSearchParams();
        params.append('userId', userAuthentication.userEmail);
        params.append('refreshToken', userAuthentication.refreshToken);

        const response = await this.axiosInstance({
            method: 'post',
            url: '/auth/refresh',
            data: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            responseType: 'json',
        });

        const refreshUserAuthentication = userAuthenticationFactory.createFromSerializeObject(response.data);
        return this.createCredentials(refreshUserAuthentication);
    }

    private createCredentials(userAuthentication: UserAuthentication): Credentials {
        return {
            id: userAuthentication.userEmail,
            userEmail: userAuthentication.userEmail,
            userId: userAuthentication.userEmail,
            accessToken: userAuthentication.accessToken,
            refreshToken: userAuthentication.refreshToken,
        };
    }
}
