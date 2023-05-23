import type { NextRequest } from 'next/server';

import { userAuthenticationFilter } from './middleware/UserAuthenticationFilter';

export async function middleware(request: NextRequest) {
    const userAuthenticationFilteredResponse = userAuthenticationFilter.doFilter(request);
    if (userAuthenticationFilteredResponse) return userAuthenticationFilteredResponse;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/dashboard/:path*'],
};
