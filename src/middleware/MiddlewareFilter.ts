import { NextRequest, NextResponse } from 'next/server';

export default interface MiddlewareFilter {
    /**
     * middleware 필터를 구현합니다.
     * middleware 필터를 구현할 때, 필터링이 필요한 경우 NextResponse를 반환하고, 필터링이 필요하지 않은 경우 null을 반환합니다.
     *
     * @param request
     * @return rewrite 될 response
     */
    doFilter(request: NextRequest): NextResponse | null;
}
