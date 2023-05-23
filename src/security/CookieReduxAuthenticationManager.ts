import { clientCookieManagerProvider } from '@cookie/client/ClientCookieManagerProvider';
import { UserAuthentication } from '@model/service/auth/UserAuthentication';
import { login, logout } from '@redux/auth/userAuthenticationSlice';
import { AuthenticationManager } from './AuthenticationManager';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Dispatch } from 'react';

/**
 * Cookie 기반으로 Redux에 유저 인증 정보를 관리합니다.
 */
export default class CookieReduxAuthenticationManager implements AuthenticationManager {
    private dispatch: ThunkDispatch<UserAuthentication, undefined, AnyAction> & Dispatch<AnyAction>;

    constructor(dispatch: ThunkDispatch<UserAuthentication, undefined, AnyAction> & Dispatch<AnyAction>) {
        this.dispatch = dispatch;
    }

    /**
     * 유저 인증정보를 cookie와 redux store에 저장합니다.
     * @param userAuthentication 저장할 유저 인증 정보
     */
    login(userAuthentication: UserAuthentication): UserAuthentication {
        clientCookieManagerProvider.userAuthenticationCookieManager.setCookie(userAuthentication);
        this.dispatch(login(userAuthentication));
        return userAuthentication;
    }

    /**
     * 현재 인증된 유저 정보를 cookie, redux store에서 삭제합니다.
     */
    logout(): UserAuthentication {
        const userAuthentication = clientCookieManagerProvider.userAuthenticationCookieManager.getCookie();

        clientCookieManagerProvider.userAuthenticationCookieManager.deleteCookie();
        this.dispatch(logout());
        return userAuthentication;
    }
}
