import { NextRequest, NextResponse } from 'next/server';
import MiddlewareFilter from './MiddlewareFilter';

import { clientCookieManagerProvider } from '@cookie/client/ClientCookieManagerProvider';
import { UserAuthentication } from '@model/service/auth/UserAuthentication';

class UserAuthenticationFilter implements MiddlewareFilter {
    /**
     * 유저 인증 정보가 없는 경우, 로그인 페이지로 리다이렉트합니다.
     *
     * @param request
     */
    doFilter(request: NextRequest): NextResponse | null {
        const userAuthenticationCookie = request.cookies.get(
            clientCookieManagerProvider.userAuthenticationCookieManager.COOKIE_NAME
        );
        if (!userAuthenticationCookie || !userAuthenticationCookie.value) {
            return this.createRedirectResponseLoginPage(request);
        }

        const userAuthentication: UserAuthentication = JSON.parse(userAuthenticationCookie?.value);
        if (userAuthentication.accessToken && userAuthentication.userEmail) {
            return null;
        }

        return this.createRedirectResponseLoginPage(request);
    }

    private createRedirectResponseLoginPage(request: NextRequest) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}
export const userAuthenticationFilter = new UserAuthenticationFilter();
