import { cookies } from 'next/headers';

import { UserAuthentication } from '@model/service/auth/UserAuthentication';
import ServerCookieManager from '@cookie/server/ServerCookieManager';
import { Credentials } from '../../security/authentication/Credentials';

export default class CredentialsCookieManager implements ServerCookieManager<Credentials> {
    readonly COOKIE_NAME: string = 'dptablo-credentials';

    getCookie(): Credentials {
        const jsonString = cookies().get(this.COOKIE_NAME);
        if (!jsonString) throw new Error('invalid credentials cookie');

        return JSON.parse(jsonString.value);
    }
}
