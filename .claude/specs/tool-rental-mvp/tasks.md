# Implementation Plan

## Phase 1: Customer PWA (Public catalog & PWA shell)

- [x] 1. Set up Next.js 14 project with TypeScript and essential dependencies
  - Initialize Next.js 14 with App Router and TypeScript configuration
  - Install and configure Tailwind CSS, shadcn/ui, and PWA dependencies
  - Set up project structure with proper folder organization
  - Configure environment variables and basic settings
  - _Requirements: 4.1, 4.2_

- [x] 2. Implement PWA foundation and service worker
- [x] 2.1 Configure PWA manifest and service worker setup
  - Create manifest.json with Utah Valley Tool Rental branding and icons
  - Set up @ducanh2912/next-pwa with proper caching strategies
  - Implement service worker with cache-first, network-first, and stale-while-revalidate patterns
  - _Requirements: 4.1, 4.2, 14.1, 14.2_

- [x] 2.2 Create offline functionality and error handling
  - Build offline page component with friendly messaging and cached actions
  - Implement background sync queue for reservation attempts
  - Add network status detection and offline indicators
  - _Requirements: 4.4, 14.3, 14.4_

- [x] 3. Build core UI components and design system
- [x] 3.1 Set up shadcn/ui components and design tokens
  - Configure shadcn/ui with Utah Valley Tool Rental theme colors
  - Create base components (Button, Card, Input, Badge, etc.)
  - Implement responsive layout components and navigation
  - _Requirements: 1.1, 2.1_

- [x] 3.2 Build tool catalog components
  - Create ToolCard component with image, name, price, availability display
  - Build ToolGrid component with responsive layout
  - Implement SearchBar component with keyword filtering
  - Create FilterPanel component for category, price, and availability filters
  - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.3_

- [x] 4. Create static seed data and availability calculation
- [x] 4.1 Build tool data structure and seed content
  - Create TypeScript interfaces for Tool and related types
  - Generate comprehensive seed data for all tool categories (Pressure Washers, Carpet Cleaners, Lawn & Garden, Power Tools)
  - Include realistic pricing, descriptions, specifications, and policies
  - _Requirements: 1.1, 3.1, 3.3_

- [x] 4.2 Implement availability calculation utilities
  - Create availability calculation functions for date ranges
  - Build calendar utilities for availability display
  - Implement dynamic pricing calculation with weekend/holiday multipliers
  - _Requirements: 3.2, 3.4, 11.1, 11.3, 15.1, 15.3_

- [x] 5. Build home page and catalog browsing
- [x] 5.1 Create home page with hero section and categories
  - Build responsive home page layout with search bar
  - Implement category navigation cards
  - Add featured tools section with dynamic content
  - Include PWA install prompt integration
  - _Requirements: 1.1, 1.2, 4.2_

- [x] 5.2 Implement tool catalog page with filtering
  - Create /tools page with grid layout and filtering sidebar
  - Implement real-time search functionality
  - Add category-based filtering and price range controls
  - Build availability-based filtering with date selection
  - _Requirements: 1.2, 2.1, 2.2, 2.3, 2.4_

- [x] 6. Create tool detail pages with availability
- [x] 6.1 Build tool detail page layout
  - Create dynamic route /tools/[slug] with tool information display
  - Implement image carousel with multiple tool photos
  - Add comprehensive tool specifications and policies section
  - Include pricing breakdown with all fees and deposits
  - _Requirements: 3.1, 3.3, 12.1_

- [x] 6.2 Add availability calendar and pricing calculation
  - Build interactive availability calendar component
  - Implement date selection with unavailable date blocking
  - Add real-time pricing calculation with dynamic multipliers
  - Create "Get Quote" functionality showing itemized costs
  - _Requirements: 3.2, 3.4, 11.3, 12.1_

- [ ] 7. Implement PWA testing and optimization
- [ ] 7.1 Set up Lighthouse CI and PWA validation
  - Configure Lighthouse CI for automated PWA scoring
  - Implement performance testing with target scores ≥90
  - Add PWA installability validation tests
  - _Requirements: 14.1, 14.2_

- [ ] 7.2 Test offline functionality and caching
  - Verify cache strategies work correctly for different content types
  - Test offline browsing with cached tool listings
  - Validate offline page displays properly when network unavailable
  - _Requirements: 4.4, 14.2, 14.3_

## Phase 2: Checkout and Reservations (Stripe integration)

- [ ] 8. Set up database with Prisma and PostgreSQL
- [ ] 8.1 Configure Prisma with PostgreSQL database
  - Install and configure Prisma with PostgreSQL connection
  - Create complete database schema with all models (User, Tool, Reservation, Payment, etc.)
  - Set up development and production database environments
  - _Requirements: 5.3, 8.3, 15.1_

- [ ] 8.2 Implement database migration and seeding
  - Create initial database migration with all tables and relationships
  - Build comprehensive database seeding script with realistic data
  - Add database utilities for development and testing
  - _Requirements: 15.1, 15.2_

- [ ] 9. Build reservation quote and checkout system
- [ ] 9.1 Create reservation quote API endpoint
  - Implement POST /api/v1/reservations/quote with date validation
  - Add availability checking with conflict prevention
  - Build pricing calculation including taxes, fees, and deposits
  - Include timezone-aware date handling for America/Denver
  - _Requirements: 5.1, 5.2, 11.1, 11.2, 12.1, 15.1_

- [ ] 9.2 Build checkout page with date and contact collection
  - Create /checkout page with multi-step form (Dates → Contact → Payment)
  - Implement date selection with availability validation
  - Add contact information form with validation using react-hook-form and Zod
  - Include pricing summary with real-time updates
  - _Requirements: 5.1, 5.2, 12.1, 13.1_

- [ ] 10. Integrate Stripe payment processing
- [ ] 10.1 Set up Stripe configuration and webhooks
  - Configure Stripe with publishable and secret keys
  - Set up Stripe webhook endpoint for payment confirmations
  - Implement webhook signature verification for security
  - _Requirements: 5.3, 12.2, 13.4_

- [ ] 10.2 Build payment processing and confirmation
  - Create Stripe payment intent creation with proper metadata
  - Implement payment confirmation page with success/failure handling
  - Add payment retry logic and error handling
  - Build reservation creation after successful payment
  - _Requirements: 5.3, 5.4, 12.2, 12.4_

- [ ] 11. Implement reservation management
- [ ] 11.1 Create reservation API endpoints
  - Build POST /api/v1/reservations with idempotency key support
  - Implement GET /api/v1/reservations/[id] for reservation details
  - Add reservation status management and updates
  - Include proper error handling for conflicts and validation
  - _Requirements: 5.3, 5.5, 10.1, 10.2_

- [ ] 11.2 Add reservation confirmation and basic notifications
  - Create reservation confirmation page with access code placeholder
  - Implement basic email notification structure (without actual sending)
  - Add reservation status tracking and updates
  - _Requirements: 7.1, 7.2_

## Phase 3: Authentication with Clerk (User accounts and session management)

- [ ] 12. Set up Clerk authentication integration
- [ ] 12.1 Configure Clerk authentication provider
  - Install and configure @clerk/nextjs with environment variables
  - Set up Clerk provider in root layout with proper configuration
  - Configure sign-in and sign-up pages with custom styling
  - _Requirements: 8.1, 8.3_

- [ ] 12.2 Implement authentication middleware and route protection
  - Create middleware.ts for route protection and authentication
  - Set up public routes (/, /tools, /checkout) and protected routes (/account, /admin)
  - Implement role-based access control with admin/customer roles
  - _Requirements: 8.3, 9.1, 9.2_

- [ ] 13. Build user account functionality
- [ ] 13.1 Create account pages and user management
  - Build /account page with user profile and reservation history
  - Implement sign-in, sign-up, and user profile pages
  - Add user role management and admin detection
  - _Requirements: 8.2, 8.4_

- [ ] 13.2 Integrate Clerk webhooks for user synchronization
  - Set up POST /api/webhooks/clerk endpoint
  - Implement user creation and update synchronization with local database
  - Add proper webhook signature verification and error handling
  - _Requirements: 8.3, 9.4_

- [ ] 14. Connect reservations to authenticated users
- [ ] 14.1 Update reservation system for authenticated users
  - Modify reservation creation to link with authenticated user accounts
  - Update reservation history display in account pages
  - Add guest checkout flow with optional account creation
  - _Requirements: 8.2, 8.4_

- [ ] 14.2 Implement user-specific reservation management
  - Create user reservation listing with status and details
  - Add reservation cancellation and modification capabilities
  - Build reservation detail view with access codes and instructions
  - _Requirements: 8.4_

## Phase 4: Cloud Locker API Integration (Time-bound PIN codes)

- [ ] 15. Design and implement locker provider abstraction
- [ ] 15.1 Create locker provider interface and adapter pattern
  - Build LockerProvider interface with createCode, deleteCode, and getStatus methods
  - Implement provider abstraction layer for multiple locker APIs
  - Create configuration system for different provider types
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 15.2 Build cloud locker API adapter
  - Implement RemoteLock-like cloud API adapter with REST endpoints
  - Add authentication and request signing for locker provider
  - Include error handling and retry logic for API failures
  - _Requirements: 6.1, 6.2_

- [ ] 16. Implement access code generation and management
- [ ] 16.1 Build access code creation system
  - Create access code generation with 6-8 digit numeric codes
  - Implement time-bound validity windows with America/Denver timezone
  - Add code uniqueness validation and collision protection
  - _Requirements: 6.1, 6.4, 11.2_

- [ ] 16.2 Add fallback mechanism for provider failures
  - Implement local code generation when cloud provider is unavailable
  - Add 'provider_sync_pending' flag and admin notification system
  - Create provider status monitoring and health checks
  - _Requirements: 6.3_

- [ ] 17. Integrate access codes with reservation system
- [ ] 17.1 Update reservation creation with access code generation
  - Modify reservation confirmation to generate and store access codes
  - Add access code display in reservation confirmation and account pages
  - Implement code regeneration capability for admin users
  - _Requirements: 5.4, 6.1, 7.1_

- [ ] 17.2 Build admin locker code management
  - Create POST /api/v1/locker-codes endpoint for admin code creation
  - Implement DELETE /api/v1/locker-codes/[reservationId] for code deletion
  - Add admin UI components for manual code management
  - _Requirements: 9.3_

## Phase 5: Admin Console (Business owner management interface)

- [ ] 18. Build admin authentication and layout
- [ ] 18.1 Create admin route protection and layout
  - Set up admin-only route protection with role verification
  - Build admin layout component with navigation and branding
  - Implement admin authentication checks and redirects
  - _Requirements: 9.1, 9.2_

- [ ] 18.2 Create admin dashboard overview
  - Build /admin dashboard with key performance indicators
  - Add today's operations summary (pickups, returns, revenue)
  - Implement quick action buttons for common tasks
  - _Requirements: 9.3_

- [ ] 19. Implement reservation management interface
- [ ] 19.1 Build reservation listing and filtering for admins
  - Create admin reservation list with status filtering and search
  - Add reservation detail view with customer information and payment status
  - Implement reservation status updates and manual operations
  - _Requirements: 9.3_

- [ ] 19.2 Add reservation actions and code management
  - Create reservation cancellation and refund processing
  - Implement manual access code regeneration and provider override
  - Add customer communication tools and note management
  - _Requirements: 9.3, 9.4_

- [ ] 20. Build tool management interface
- [ ] 20.1 Create tool CRUD operations for admins
  - Build tool creation form with all fields and validation
  - Implement tool editing interface with image upload
  - Add tool status management (available, maintenance, retired)
  - _Requirements: 9.3_

- [ ] 20.2 Implement availability and pricing management
  - Create availability calendar management for individual tools
  - Add bulk availability updates and maintenance scheduling
  - Implement pricing management with seasonal and dynamic adjustments
  - _Requirements: 9.3, 15.4_

- [ ] 21. Add basic analytics and reporting
- [ ] 21.1 Implement analytics data collection
  - Create analytics event tracking for key user actions
  - Build data aggregation functions for revenue, usage, and performance metrics
  - Add database queries for common reporting needs
  - _Requirements: 10.3_

- [ ] 21.2 Build admin analytics dashboard
  - Create revenue reporting with daily, weekly, and monthly views
  - Implement tool utilization reports and popular category analysis
  - Add customer behavior analytics and reservation patterns
  - _Requirements: 10.3_

## Phase 6: Notifications and Advanced Analytics

- [ ] 22. Implement notification system architecture
- [ ] 22.1 Build notification service abstraction
  - Create NotificationService interface with SMS and email adapters
  - Implement provider abstraction for Twilio SMS and SendGrid email
  - Add notification queueing and retry logic with failure handling
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 22.2 Create notification templates and scheduling
  - Build notification templates for confirmation, reminders, and overdue notices
  - Implement timezone-aware scheduling for 12h pickup and 2h return reminders
  - Add notification preference management and opt-out handling
  - _Requirements: 7.1, 7.2, 7.3, 11.1_

- [ ] 23. Build SMS and email notification implementation
- [ ] 23.1 Implement SMS notifications with Twilio
  - Set up Twilio integration with account credentials and phone number validation
  - Create SMS sending functionality with delivery status tracking
  - Add SMS template rendering with dynamic content insertion
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 23.2 Implement email notifications with SendGrid
  - Configure SendGrid integration with template management
  - Create email sending with HTML templates and proper formatting
  - Add email delivery tracking and bounce handling
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 24. Integrate notifications with reservation lifecycle
- [ ] 24.1 Add automatic notification triggers
  - Implement confirmation notifications immediately after payment success
  - Create automated reminder scheduling based on pickup and return times
  - Add overdue notification system with escalating reminders
  - _Requirements: 7.1, 7.2, 7.3, 11.1, 11.2_

- [ ] 24.2 Build notification management and admin controls
  - Create admin interface for viewing notification history and status
  - Implement manual notification sending and template customization
  - Add notification settings and customer communication preferences
  - _Requirements: 7.4_

- [ ] 25. Implement advanced analytics and reporting
- [ ] 25.1 Build comprehensive analytics data collection
  - Create event tracking for all user interactions and business metrics
  - Implement funnel analysis for reservation conversion rates
  - Add customer lifetime value and retention analytics
  - _Requirements: 10.3_

- [ ] 25.2 Create advanced admin analytics dashboard
  - Build interactive charts for revenue trends and seasonal patterns
  - Implement tool performance analytics with utilization rates and profitability
  - Add customer segmentation and behavior analysis dashboards
  - Create exportable reports for business planning and tax purposes
  - _Requirements: 10.3_

- [ ] 26. Final testing and deployment preparation
- [ ] 26.1 Implement comprehensive testing suite
  - Create unit tests for all business logic and utility functions
  - Build integration tests for API endpoints and external service integration
  - Add end-to-end tests for complete user journeys and PWA functionality
  - _Requirements: All requirements validation_

- [ ] 26.2 Prepare production deployment and monitoring
  - Set up production environment configuration and secrets management
  - Implement monitoring and logging for performance and error tracking
  - Create deployment scripts and CI/CD pipeline configuration
  - Add health checks and uptime monitoring for all critical services
  - _Requirements: 13.1, 13.2, 13.3_