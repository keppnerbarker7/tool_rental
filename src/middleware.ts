import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sign-out(.*)',
  '/api/health(.*)',
  '/tools(.*)',
  '/about(.*)',
  '/support(.*)',
]);

// Admin routes requiring ADMIN role
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

// API routes
const isApiRoute = createRouteMatcher(['/api(.*)']);

// Security headers
const securityHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://m.stripe.network https://*.clerk.accounts.dev https://*.clerk.com; " +
    "style-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com; " +
    "img-src 'self' blob: data: https: https://img.clerk.com; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://api.stripe.com https://*.supabase.co https://*.clerk.accounts.dev https://*.clerk.com https://clerk.*.lcl.dev; " +
    "frame-src https://js.stripe.com https://hooks.stripe.com https://*.clerk.accounts.dev https://*.clerk.com;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Check if Clerk is properly configured
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    // If Clerk not configured, only allow access to public routes
    if (!isPublicRoute(req)) {
      if (isApiRoute(req)) {
        return NextResponse.json(
          { error: 'Authentication service not available' },
          { status: 503 }
        );
      }
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    return NextResponse.next();
  }

  // Allow public routes without authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // All other routes require authentication
  if (!userId) {
    if (isApiRoute(req)) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }
    // Redirect to sign-in with return URL
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Protect admin routes (additional check will be done in components)
  if (isAdminRoute(req)) {
    await auth.protect();
  }

  // Create response with security headers
  const response = NextResponse.next();

  // Add security headers to all responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};