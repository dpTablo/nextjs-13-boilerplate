import { ErrorObject } from 'ajv/lib/types';

export class ServiceResponseInvalidJsonError extends Error {
    constructor(errors: ErrorObject[] | null | undefined) {
        if (errors === null || errors === undefined) {
            super('');
        } else {
            const errorMessages = JSON.stringify(errors);
            super(`유효하지 않은 Service 의 JSON 응답 : ${errorMessages}`);
        }
    }
}
