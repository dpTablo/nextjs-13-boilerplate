import { expect, beforeAll, afterAll, afterEach } from '@jest/globals';
import axios, { AxiosError } from 'axios';
import { setupServer, SetupServer } from 'msw/node';

import { DefaultAuthenticationService } from '@service/auth/DefaultAuthenticationService';
import { rest } from 'msw';

describe('DefaultAuthenticationService Tests', () => {
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

    const authService = new DefaultAuthenticationService();
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BACK_END_SERVICE_BASE_URL,
        timeout: 1000 * 10,
    });
    authService.setAxiosInstance(axiosInstance);

    it('login - 정상 케이스', async () => {
        // given
        const mockHandler = [
            rest.post(
                `${process.env.NEXT_PUBLIC_API_BACK_END_SERVICE_BASE_URL}/auth/login`,
                async (request, response, context) => {
                    const arrayBuffer = await request.arrayBuffer();

                    const valueArray = Array.from(new Uint8Array(arrayBuffer));
                    const encodedString = String.fromCharCode.apply(null, valueArray);
                    const paramsString = decodeURIComponent(encodedString);

                    const params = paramsString.split('&');
                    const userId = params[0].split('=')[1];
                    const password = params[1].split('=')[1];

                    if (!userId || !password) {
                        return response(context.status(500), context.text('invalid parameters'));
                    }

                    return response(
                        context.status(200),
                        context.json({
                            userId: 'user1@gmail.com',
                            accessToken: 'abc123ghj',
                            refreshToken: 'abc999dkdk',
                            expires: 233484,
                        })
                    );
                }
            ),
        ];
        mockServer.resetHandlers(...mockHandler);

        // when
        const credentials = await authService.login('user1@gmail.com', '1234');

        // then
        expect(credentials).toBeTruthy();
        expect(credentials.userEmail).toBe('user1@gmail.com');
        expect(credentials.accessToken).toBe('abc123ghj');
        expect(credentials.refreshToken).toBe('abc999dkdk');
    });

    it('login - empty userId', async () => {
        // given
        const mockHandler = [
            rest.post(
                `${process.env.NEXT_PUBLIC_API_BACK_END_SERVICE_BASE_URL}/auth/login`,
                async (request, response, context) => {
                    return response(context.status(500), context.text('invalid parameters'));
                }
            ),
        ];
        mockServer.resetHandlers(...mockHandler);

        // when & then
        try {
            await authService.login('', '1234');
        } catch (error: any) {
            expect(error).toBeInstanceOf(AxiosError);
        }
    });

    it('refresh - 정상 케이스', async () => {
        // given
        const mockHandler = [
            rest.post(
                `${process.env.NEXT_PUBLIC_API_BACK_END_SERVICE_BASE_URL}/auth/refresh`,
                async (request, response, context) => {
                    const arrayBuffer = await request.arrayBuffer();

                    const valueArray = Array.from(new Uint8Array(arrayBuffer));
                    const encodedString = String.fromCharCode.apply(null, valueArray);
                    const paramsString = decodeURIComponent(encodedString);

                    const params = paramsString.split('&');
                    const userId = params[0].split('=')[1];
                    const refreshToken = params[1].split('=')[1];

                    if (!userId || !refreshToken) {
                        return response(context.status(500), context.text('invalid parameters'));
                    }

                    return response(
                        context.status(200),
                        context.json({
                            userId: 'user1@gmail.com',
                            accessToken: 'asdf_new_access_token_asdf',
                            refreshToken: 'asdf_new_refresh_token_asdf',
                            expires: 292929,
                        })
                    );
                }
            ),
        ];
        mockServer.resetHandlers(...mockHandler);

        // when
        const userAuthentication = await authService.refresh({
            userEmail: 'user1@gmail.com',
            refreshToken: 'asdf_new_access_token_asdf',
            accessToken: 'asdf_new_refresh_token_asdf',
            expires: 292929,
        });

        // then
        expect(userAuthentication).toBeTruthy();
    });
});
