import { AuthenticationManager } from '../../security/authentication/AuthenticationManager';
import { InternalAxiosRequestConfig } from 'axios';

export function jwtTokenAuthorizationRequestInterceptorHandler(authenticationManager: AuthenticationManager) {
    const mAuthenticationManager = authenticationManager;

    return async (config: InternalAxiosRequestConfig) => {
        const wrapConfig = Object.assign(config, {});

        const credentials = await mAuthenticationManager.getCredentials();
        if (credentials?.accessToken) {
            wrapConfig.headers.Authorization = `Bearer ${credentials.accessToken}`;
        }
        return wrapConfig;
    };
}
