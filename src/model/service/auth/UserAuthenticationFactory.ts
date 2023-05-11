import { UserAuthentication, UserAuthenticationJsonSchema } from '@model/service/auth/UserAuthentication';
import Ajv from 'ajv';
import { ServiceResponseInvalidJsonError } from '@error/ServiceResponseInvalidJsonError';
import { ServiceModelFactory } from '@model/service/ServiceModelFactory';

class UserAuthenticationFactory implements ServiceModelFactory<UserAuthentication> {
    createFromSerializeObject(source: object): UserAuthentication {
        const avj = new Ajv();
        const validate = avj.compile(UserAuthenticationJsonSchema);
        if (!validate(source)) {
            throw new ServiceResponseInvalidJsonError(validate.errors);
        }

        return {
            userEmail: source.userId as string,
            accessToken: source.accessToken as string,
            refreshToken: source.refreshToken as string,
            expires: source.expires as number,
        };
    }
}

export const userAuthenticationFactory = new UserAuthenticationFactory();
