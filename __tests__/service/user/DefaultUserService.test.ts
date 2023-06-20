import { expect, beforeAll, afterAll, afterEach } from '@jest/globals';
import axios, { AxiosError } from 'axios';
import { DefaultUserService } from '@service/user/DefaultUserService';
import { setupServer, SetupServer } from 'msw/node';
import { rest } from 'msw';

describe('DefaultUserService Tests', () => {
    const mockServer: SetupServer = setupServer();

    beforeAll(() => {
        mockServer.listen();
    });

    afterEach(() => {
        mockServer.resetHandlers();
    });

    afterAll(() => {
        // server.close();
        mockServer.close();
    });

    const userService = new DefaultUserService();
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BACK_END_SERVICE_BASE_URL,
        timeout: 1000 * 10,
    });
    userService.setAxiosInstance(axiosInstance);

    it('getUser - 정상 케이스', async () => {
        // given
        const mockHandler = [
            rest.get(
                `${process.env.NEXT_PUBLIC_API_BACK_END_SERVICE_BASE_URL}/user`,
                async (request, response, context) => {
                    const userId = request.url.searchParams.get('userId');

                    if (!userId || userId === 'user1Gmail.com') {
                        return response(context.status(500), context.text('invalid parameters'));
                    }

                    return response(
                        context.status(200),
                        context.json({
                            userId: userId,
                            firstName: '홍',
                            lastName: '길동',
                        })
                    );
                }
            ),
        ];
        mockServer.resetHandlers(...mockHandler);

        // when
        const userAuthentication = await userService.getUser('user1@gmail.com');

        // then
        expect(userAuthentication).toBeTruthy();
    });
});
