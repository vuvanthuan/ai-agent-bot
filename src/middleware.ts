import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedDomains = process.env.ALLOWED_IFRAME_DOMAINS?.split(',').map(d => d.trim()) || [];

export function middleware(request: NextRequest) {
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.next();
    }

    const fromParam = request.nextUrl.searchParams.get('from') || '';
    const origin = request.headers.get('origin') || request.headers.get('referer') || fromParam;
    const isSameOrigin = !origin || origin === request.nextUrl.origin;
    const isAllowed = isSameOrigin || allowedDomains.some(domain => origin.startsWith(domain));

    if (!isAllowed) {
        return new NextResponse(
            `<html><body><h2 style="color:red;">Iframe embedding not allowed for this domain.</h2></body></html>`,
            {
                status: 403,
                headers: { 'Content-Type': 'text/html' },
            }
        );
    }

    const response = NextResponse.next();
    const cspDomains = [...allowedDomains, "'self'"].join(' ');
    response.headers.set('Content-Security-Policy', `frame-src ${cspDomains};`);

    return response;
}

export const config = {
    matcher: ['/embed'],
};
