import Avj from 'ajv';
import { ServiceResponseInvalidJsonError } from '../../../error/ServiceResponseInvalidJsonError';

const schema = {
    type: 'object',
    properties: {
        userId: { type: 'string' },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
    },
    required: ['userId', 'accessToken', 'refreshToken'],
    additionalProperties: false,
};

export class UserAuthentication {
    private _userId = '';

    private _accessToken = '';

    private _refreshToken = '';

    static fromJson(json: object): UserAuthentication {
        const avj = new Avj();
        const validate = avj.compile(schema);
        if (!validate(json)) {
            throw new ServiceResponseInvalidJsonError(validate.errors);
        }

        const instance = new UserAuthentication();
        instance.userId = json.userId as string;
        instance.accessToken = json.accessToken as string;
        instance.refreshToken = json.refreshToken as string;
        return instance;
    }

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    get accessToken(): string {
        return this._accessToken;
    }

    set accessToken(value: string) {
        this._accessToken = value;
    }

    get refreshToken(): string {
        return this._refreshToken;
    }

    set refreshToken(value: string) {
        this._refreshToken = value;
    }
}
