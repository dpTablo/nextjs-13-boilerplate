import { UserAuthenticationCookieManager } from './UserAuthenticationCookieManager';

class ClientCookieManagerProvider {
    readonly userAuthenticationCookieManager = new UserAuthenticationCookieManager();
}

export const clientCookieManagerProvider = new ClientCookieManagerProvider();
