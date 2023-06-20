import { AxiosInstance } from 'axios';

import { AxiosProvider } from '../AxiosProvider';
import { AxiosFactory } from '../AxiosFactory';
import { AxiosInstanceType } from '../AxiosInstanceType';
import { AuthenticationManager } from '../../../security/authentication/AuthenticationManager';
import { jwtTokenAuthorizationRequestInterceptorHandler } from '../jwtTokenAuthorizationRequestInterceptorHandler';
import { jwtTokenRefreshResponseInterceptorHandler } from '../jwtTokenRefreshResponseInterceptorHandler';
import { DefaultAxiosProvider } from './DefaultAxiosProvider';

export class JwtTokenInterceptingAxiosProvider implements AxiosProvider {
    private _axiosInstance!: AxiosInstance;

    private _authenticationManager: AuthenticationManager;

    private _axiosProvider = new DefaultAxiosProvider();

    constructor(authenticationManager: AuthenticationManager) {
        this._authenticationManager = authenticationManager;
    }

    getAxiosInstance(): AxiosInstance {
        if (this._axiosInstance) {
            return this._axiosInstance;
        }

        this.init();
        return this._axiosInstance;
    }

    private init(): void {
        const axiosFactory = new AxiosFactory();
        this._axiosInstance = axiosFactory.getDefaultAxiosInstance(AxiosInstanceType.AUTHENTICATION);

        this.setupJwtTokenAuthenticationInterceptors();
    }

    private setupJwtTokenAuthenticationInterceptors() {
        this._axiosInstance.interceptors.request.use(
            jwtTokenAuthorizationRequestInterceptorHandler(this._authenticationManager),
            (error) => Promise.reject(error)
        );

        this._axiosInstance.interceptors.response.use(
            (response) => response,
            jwtTokenRefreshResponseInterceptorHandler(this._axiosProvider, this._authenticationManager)
        );
    }
}
