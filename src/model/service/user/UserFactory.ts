import { UserAuthenticationJsonSchema } from '@model/service/auth/UserAuthentication';
import Ajv from 'ajv';
import { ServiceResponseInvalidJsonError } from '@error/ServiceResponseInvalidJsonError';
import { ServiceModelFactory } from '@model/service/ServiceModelFactory';
import { User, UserJsonSchema } from '@model/service/user/User';

class UserFactory implements ServiceModelFactory<User> {
    createFromSerializeObject(source: object): User {
        const avj = new Ajv();
        const validate = avj.compile(UserJsonSchema);
        if (!validate(source)) {
            throw new ServiceResponseInvalidJsonError(validate.errors);
        }

        return {
            userEmail: source.userId as string,
            firstName: source.firstName as string,
            lastName: source.lastName as string,
        };
    }

    createEmptyInstance(): User {
        return {
            userEmail: '',
            firstName: '',
            lastName: '',
        };
    }
}

export const userFactory = new UserFactory();
