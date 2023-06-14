import type { NextRequest } from 'next/server';

import { credentialsFilter } from './middleware/CredentialsFilter';

export async function middleware(request: NextRequest) {
    const credentialsFilteredResponse = credentialsFilter.doFilter(request);
    if (credentialsFilteredResponse) return credentialsFilteredResponse;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/dashboard/:path*'],
};
