import { cookies } from 'next/headers';

import { UserAuthentication } from '@model/service/auth/UserAuthentication';
import ServerCookieManager from '@cookie/server/ServerCookieManager';

class UserAuthenticationCookieManager implements ServerCookieManager<UserAuthentication> {
    private readonly COOKIE_NAME: string = 'userAuthentication';

    getCookie(): UserAuthentication {
        const jsonString = cookies().get(this.COOKIE_NAME);
        if (!jsonString) throw new Error('invalid userAuthentication cookie');

        return JSON.parse(jsonString.value);
    }
}
export default UserAuthenticationCookieManager;
