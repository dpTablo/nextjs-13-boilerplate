import UserAuthenticationCookieManager from '@cookie/server/UserAuthenticationCookieManager';

class ServerCookieManagerProvider {
    userAuthenticationCookieManager = new UserAuthenticationCookieManager();
}
export const serverCookieManagerProvider = new ServerCookieManagerProvider();
