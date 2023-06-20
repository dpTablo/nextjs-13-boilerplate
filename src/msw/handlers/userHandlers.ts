import { rest } from 'msw';

export const userHandlers = [
    rest.get(`${process.env.NEXT_PUBLIC_API_BACK_END_SERVICE_BASE_URL}/user`, async (request, response, context) => {
        const userId = request.url.searchParams.get('userId');

        if (!userId) {
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
    }),
];
