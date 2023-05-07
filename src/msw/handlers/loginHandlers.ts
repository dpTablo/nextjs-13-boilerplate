import { rest } from 'msw';

export const loginHandlers = [
    rest.post('https://api.dptablo.com/v3/auth/login', async (request, response, context) => {
        const arrayBuffer = await request.arrayBuffer();
        const encodedString = new TextDecoder('utf-8').decode(arrayBuffer);
        const paramsString = decodeURIComponent(encodedString);

        const params = paramsString.split('&');
        const userId = params[0].split('=')[1];

        return response(
            context.status(200),
            context.json({
                userId: userId,
                accessToken: 'klsdlkjfskljf982f2cn8349238un4cr9u39re',
                refreshToken: 'klx38p4mox13iun3ciu4tu34lbc3rjcklhwqe',
            })
        );
    }),
];
