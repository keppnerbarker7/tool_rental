import withPWA from '@ducanh2912/next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },
};

const withPWAConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      // Cache-first strategy for static assets
      {
        urlPattern: /^https?:.*\.(png|jpg|jpeg|svg|gif|webp|ico|woff|woff2|ttf|eot)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'static-assets',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
      // Cache-first for root, tools pages, icons, and fonts
      {
        urlPattern: /^https?:\/\/[^\/]+\/(|tools.*|icons\/.*|fonts\/.*)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'pages-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 24 * 60 * 60, // 1 day
          },
        },
      },
      // Stale-while-revalidate for tool data API
      {
        urlPattern: /^https?:\/\/[^\/]+\/api\/v1\/tools.*/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'tools-api',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60, // 1 hour
          },
        },
      },
      // Network-first for account and admin pages
      {
        urlPattern: /^https?:\/\/[^\/]+\/(account.*|admin.*)/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'user-pages',
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 30 * 60, // 30 minutes
          },
        },
      },
      // Network-first for user-specific API calls
      {
        urlPattern: /^https?:\/\/[^\/]+\/api\/v1\/(reservations|user|payments|checkout).*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'user-api',
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 60, // 30 minutes
          },
        },
      },
      // Network-only for authentication and sensitive operations
      {
        urlPattern: /^https?:\/\/[^\/]+\/api\/(webhooks|auth).*/,
        handler: 'NetworkOnly',
      },
    ],
  },
});

export default withPWAConfig(nextConfig);