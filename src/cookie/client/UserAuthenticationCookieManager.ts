import Cookies from 'js-cookie';
import { UserAuthentication } from '@model/service/auth/UserAuthentication';

export class UserAuthenticationCookieManager implements ClientCookieManager<UserAuthentication> {
    private readonly COOKIE_NAME: string = 'userAuthentication';

    public getCookie(): UserAuthentication {
        const jsonString = Cookies.get(this.COOKIE_NAME);
        if (!jsonString) throw new Error('invalid userAuthentication cookie');

        return JSON.parse(jsonString);
    }

    public setCookie(value: UserAuthentication): void {
        Cookies.set(this.COOKIE_NAME, JSON.stringify(value));
    }

    public deleteCookie(): void {
        Cookies.remove(this.COOKIE_NAME);
    }
}
