import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest } from 'next/server';

import { updateSession } from '@/utils/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // Update session for all requests
  const supabaseResponse = await updateSession(request);

  const { pathname } = request.nextUrl;

  // If it's an admin route, the Supabase middleware handles redirection/protection
  if (pathname.startsWith("/admin")) {
    return supabaseResponse;
  }

  // For other routes, apply internationalization middleware
  // Note: we might need to preserve cookies updated by Supabase
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
