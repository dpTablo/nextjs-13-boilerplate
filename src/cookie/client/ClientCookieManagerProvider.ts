import { UserAuthenticationCookieManager } from './UserAuthenticationCookieManager';
import { CredentialsCookieManager } from '@cookie/client/CredentialsCookieManager';

class ClientCookieManagerProvider {
    readonly userAuthenticationCookieManager = new UserAuthenticationCookieManager();

    readonly credentialsCookieManager = new CredentialsCookieManager();
}

export const clientCookieManagerProvider = new ClientCookieManagerProvider();
