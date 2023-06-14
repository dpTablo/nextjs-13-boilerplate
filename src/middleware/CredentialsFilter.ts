import { NextRequest, NextResponse } from 'next/server';
import MiddlewareFilter from './MiddlewareFilter';

import { clientCookieManagerProvider } from '@cookie/client/ClientCookieManagerProvider';
import { Credentials } from '../security/authentication/Credentials';

class CredentialsFilter implements MiddlewareFilter {
    /**
     * 유저 인증 정보가 없는 경우, 로그인 페이지로 리다이렉트합니다.
     *
     * @param request
     */
    doFilter(request: NextRequest): NextResponse | null {
        const credentialsCookie = request.cookies.get(clientCookieManagerProvider.credentialsCookieManager.COOKIE_NAME);
        if (!credentialsCookie || !credentialsCookie.value) {
            return this.createRedirectResponseLoginPage(request);
        }

        const credentials: Credentials = JSON.parse(credentialsCookie?.value);
        if (credentials.accessToken && credentials.userEmail) {
            return null;
        }

        return this.createRedirectResponseLoginPage(request);
    }

    private createRedirectResponseLoginPage(request: NextRequest) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}
export const credentialsFilter = new CredentialsFilter();
