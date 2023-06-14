import UserAuthenticationCookieManager from '@cookie/server/UserAuthenticationCookieManager';
import CredentialsCookieManager from '@cookie/server/CredentialsCookieManager';

class ServerCookieManagerProvider {
    readonly userAuthenticationCookieManager = new UserAuthenticationCookieManager();

    readonly credentialsCookieManager = new CredentialsCookieManager();
}
export const serverCookieManagerProvider = new ServerCookieManagerProvider();
