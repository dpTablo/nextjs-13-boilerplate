import { expect } from '@jest/globals';
import { ServiceResponseInvalidJsonError } from '@error/ServiceResponseInvalidJsonError';
import { userAuthenticationFactory } from '@model/service/auth/UserAuthenticationFactory';

describe('UserAuthenticationFactory Tests', () => {
    it('deserialize - 정상적인 json', () => {
        // given
        const json = {
            userId: 'user1@gmail.com',
            accessToken: 'abcdefg1234',
            refreshToken: 'ieioeiout22e',
            expires: 10000,
        };

        // when
        const userAuthentication = userAuthenticationFactory.createFromSerializeObject(json);

        // then
        expect(userAuthentication).toBeTruthy();
        expect(userAuthentication.userEmail).toBe(json.userId);
        expect(userAuthentication.accessToken).toEqual(json.accessToken);
        expect(userAuthentication.refreshToken).toEqual(json.refreshToken);
        expect(userAuthentication.expires).toEqual(json.expires);
    });

    it('deserialize - 잘못된 json 데이터의 예외 발생', () => {
        // given
        const json = {
            userid: 'user1@gmail.com',
            accessToken: 0,
            refreshToken: '',
        };

        // when & then
        expect(() => {
            userAuthenticationFactory.createFromSerializeObject(json);
        }).toThrow(ServiceResponseInvalidJsonError);
    });
});
