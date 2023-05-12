export const UserJsonSchema = {
    type: 'object',
    properties: {
        userId: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
    },
    required: ['userId', 'firstName', 'lastName'],
    additionalProperties: false,
};

export interface User {
    userEmail: string;
    firstName: string;
    lastName: string;
}
