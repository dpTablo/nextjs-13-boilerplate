import Cookies from 'js-cookie';

import ClientCookieManager from '@cookie/client/ClientCookieManager';
import { Credentials } from '../../security/authentication/Credentials';

export class CredentialsCookieManager implements ClientCookieManager<Credentials> {
    readonly COOKIE_NAME: string = 'dptablo-credentials';

    public getCookie(): Credentials {
        const jsonString = Cookies.get(this.COOKIE_NAME);
        if (!jsonString) throw new Error('invalid credentials cookie');

        return JSON.parse(jsonString);
    }

    public setCookie(value: Credentials): void {
        Cookies.set(this.COOKIE_NAME, JSON.stringify(value));
    }

    public deleteCookie(): void {
        Cookies.remove(this.COOKIE_NAME);
    }
}
