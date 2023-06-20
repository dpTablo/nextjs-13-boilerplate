import { expect, beforeAll, afterAll, afterEach } from '@jest/globals';
import { setupServer, SetupServer } from 'msw/node';
import { rest } from 'msw';

import { DefaultUserService } from '@service/user/DefaultUserService';
import { DefaultAxiosProvider } from '../../../src/http/axios/provider/DefaultAxiosProvider';

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
    const axiosProvider = new DefaultAxiosProvider();
    userService.setAxiosProvider(axiosProvider);

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
