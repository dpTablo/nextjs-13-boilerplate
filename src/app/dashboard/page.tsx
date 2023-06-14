import ServerSideUserProfile from '@components/auth/ServerSideUserProfile';
import ClientSideUserProfile from '@components/auth/ClientSideUserProfile';

import { serverCookieManagerProvider } from '@cookie/server/ServerCookieManagerProvider';

export default function DashboardPage() {
    const credentialsCookieManager = serverCookieManagerProvider.credentialsCookieManager;

    const credentials = credentialsCookieManager.getCookie();

    return (
        <div>
            <div>대시보드 페이지</div>
            <div>
                <div>
                    <ServerSideUserProfile userId={credentials.userEmail} />
                </div>
                <div>
                    <ClientSideUserProfile />
                </div>
            </div>
        </div>
    );
}
