import { expect, beforeAll, afterAll, afterEach } from '@jest/globals';
import { server } from '@msw/server';
import { DefaultAuthService } from '@service/auth/DefaultAuthService';
import { AxiosError } from 'axios';

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});

describe('DefaultAuthService Tests', () => {
    const authService = new DefaultAuthService();

    it('login - 정상 케이스', async () => {
        // when
        const userAuthentication = await authService.login('user1@gmail.com', '1234');

        // then
        expect(userAuthentication).toBeTruthy();
    });

    it('login - empty userId', async () => {
        // when & then
        try {
            await authService.login('', '1234');
        } catch (error: any) {
            expect(error).toBeInstanceOf(AxiosError);
        }
    });
});
