import Ajv from 'ajv';
import { ServiceResponseInvalidJsonError } from '@error/ServiceResponseInvalidJsonError';
import { JsonDeserializable } from '@model/service/JsonDeserializable';

const schema = {
    type: 'object',
    properties: {
        userId: { type: 'string' },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
        expires: { type: 'number' },
    },
    required: ['userId', 'accessToken', 'refreshToken', 'expires'],
    additionalProperties: false,
};

export class UserAuthentication implements JsonDeserializable {
    private _userEmail = '';

    private _accessToken = '';

    private _refreshToken = '';

    private _expires = 0;

    deserialize(json: object) {
        const avj = new Ajv();
        const validate = avj.compile(schema);
        if (!validate(json)) {
            throw new ServiceResponseInvalidJsonError(validate.errors);
        }

        this.userEmail = json.userId as string;
        this.accessToken = json.accessToken as string;
        this.refreshToken = json.refreshToken as string;
        this.expires = json.expires as number;
    }

    get userEmail(): string {
        return this._userEmail;
    }

    set userEmail(value: string) {
        this._userEmail = value;
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

    get expires(): number {
        return this._expires;
    }

    set expires(value: number) {
        this._expires = value;
    }
}
