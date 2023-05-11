export const UserAuthenticationJsonSchema = {
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

export interface UserAuthentication {
    userEmail: string;
    accessToken: string;
    refreshToken: string;
    expires: number;
}
