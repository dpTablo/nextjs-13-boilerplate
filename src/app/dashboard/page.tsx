import ServerSideUserProfile from '@components/auth/ServerSideUserProfile';
import ClientSideUserProfile from '@components/auth/ClientSideUserProfile';

import { serverCookieManagerProvider } from '@cookie/server/ServerCookieManagerProvider';

export default function DashboardPage() {
    const userAuthenticationCookieManager = serverCookieManagerProvider.userAuthenticationCookieManager;

    const userAuthentication = userAuthenticationCookieManager.getCookie();
    console.log(userAuthentication);

    return (
        <div>
            <div>대시보드 페이지</div>
            <div>
                <div>
                    {/* @ts-expect-error Async Server Component */}
                    <ServerSideUserProfile userId={userAuthentication.userEmail} />
                </div>
                <div>
                    <ClientSideUserProfile />
                </div>
            </div>
        </div>
    );
}
