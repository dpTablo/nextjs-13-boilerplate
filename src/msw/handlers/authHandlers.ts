import { rest } from 'msw';

export const authHandlers = [
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
                    userId: userId,
                    accessToken: 'klsdlkjfskljf982f2cn8349238un4cr9u39re',
                    refreshToken: 'klx38p4mox13iun3ciu4tu34lbc3rjcklhwqe',
                    expires: 233484,
                })
            );
        }
    ),

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
                    userId: userId,
                    accessToken: 'new_sdjkljklsdfl;sdfkl;sdf',
                    refreshToken: 'new_wiorwrklsdfkljasdf',
                    expires: 200000,
                })
            );
        }
    ),
];
