import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    return;
  }

  return intlMiddleware(request);
}


export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
