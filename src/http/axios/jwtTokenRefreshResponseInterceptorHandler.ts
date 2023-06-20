import { AxiosResponse } from 'axios';

import { AuthenticationManager } from '../../security/authentication/AuthenticationManager';
import { AxiosProvider } from './AxiosProvider';

export function jwtTokenRefreshResponseInterceptorHandler(
    axiosProvider: AxiosProvider,
    authenticationManager: AuthenticationManager
) {
    const mAuthenticationManager = authenticationManager;

    return async (response: AxiosResponse) => {
        const currentCredentials = await mAuthenticationManager.getCredentials();

        if (response.status === 401 && currentCredentials?.refreshToken) {
            try {
                const newCredentials = await mAuthenticationManager.refreshSign();

                const originalConfig = response.config;
                originalConfig.headers.Authorization = `Bearer ${newCredentials?.accessToken}`;

                return await axiosProvider.getAxiosInstance().request(originalConfig);
            } catch (reRequestError) {
                return Promise.reject(reRequestError);
            }
        } else {
            return Promise.reject('unauthorized');
        }
    };
}
