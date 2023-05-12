import { expect, beforeAll, afterAll, afterEach } from '@jest/globals';
import { server } from '@msw/server';
import { AxiosError } from 'axios';
import { DefaultUserService } from '@service/user/DefaultUserService';

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});

describe('DefaultUserService Tests', () => {
    const userService = new DefaultUserService();

    it('getUser - 정상 케이스', async () => {
        // when
        const userAuthentication = await userService.getUser('user1@gmail.com');

        // then
        expect(userAuthentication).toBeTruthy();
    });
});
