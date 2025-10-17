# Requirements Document

## Introduction

The Self-Service Tool Rental MVP is a Progressive Web Application (PWA) that enables homeowners, renters, college students, and handypeople to rent expensive, occasionally used tools through a self-service system. Customers can browse, reserve, and pay for tools online, then receive time-bound access codes to retrieve tools from smart lockers. The application targets Utah County residents with a friendly, trustworthy, and simple brand experience optimized for mobile devices.

## Requirements

### Requirement 1: Tool Catalog Browsing
**User Story:** As a customer, I want to browse available tools by category, so that I can find the right tool for my project

#### Acceptance Criteria
1. WHEN the customer visits the home page THEN the system SHALL display tool categories including Pressure Washers, Carpet Cleaners, Lawn & Garden, and Power Tools
2. WHEN the customer selects a category THEN the system SHALL display all available tools in that category
3. WHEN the customer views the tool catalog THEN the system SHALL display tool cards with name, image, price per day, deposit requirement, location, and availability status
4. IF the customer is offline THEN the system SHALL display cached tool listings with an offline indicator

### Requirement 2: Tool Search and Filtering
**User Story:** As a customer, I want to search and filter tools, so that I can quickly find tools that meet my specific needs and budget

#### Acceptance Criteria
1. WHEN the customer enters keywords in the search bar THEN the system SHALL return tools matching the search terms in name, description, or category
2. WHEN the customer applies filters THEN the system SHALL filter tools by category, price range, and next available date
3. WHEN the customer sets a price range filter THEN the system SHALL display only tools within the specified daily rental price range
4. WHEN the customer filters by availability THEN the system SHALL show only tools available on or before the selected date

### Requirement 3: Tool Detail Information
**User Story:** As a customer, I want to view detailed information about a tool, so that I can make an informed rental decision

#### Acceptance Criteria
1. WHEN the customer selects a tool THEN the system SHALL display detailed information including photos, specifications, replacement cost, training tips, and rental policies
2. WHEN viewing tool details THEN the system SHALL display an availability calendar showing available and unavailable dates
3. WHEN the customer views pricing THEN the system SHALL show base daily rate, weekend/holiday multipliers, taxes, fees, and deposit requirements
4. WHEN the tool has dynamic pricing THEN the system SHALL calculate and display the total cost for selected dates including any weekend or holiday multipliers

### Requirement 4: Progressive Web App Functionality
**User Story:** As a mobile user, I want to install the app on my device, so that I can access it quickly like a native app

#### Acceptance Criteria
1. WHEN the customer visits the site on a compatible browser THEN the system SHALL display an install prompt for the PWA
2. WHEN the PWA is installed THEN the system SHALL launch in standalone mode with the specified theme colors and branding
3. WHEN the customer is offline THEN the system SHALL display cached pages for browsing tools and viewing existing reservations
4. IF the customer navigates to an uncached page while offline THEN the system SHALL display a friendly offline page with available actions

### Requirement 5: Reservation Creation and Payment
**User Story:** As a customer, I want to reserve and pay for a tool online, so that I can secure my rental without visiting a physical location

#### Acceptance Criteria
1. WHEN the customer selects rental dates THEN the system SHALL verify tool availability and calculate total pricing including base rate, taxes, fees, and deposits
2. WHEN the customer proceeds to checkout THEN the system SHALL collect contact information including name, email, and mobile phone number
3. WHEN the customer completes payment THEN the system SHALL process payment through Stripe and create a confirmed reservation
4. WHEN payment is successful THEN the system SHALL generate a unique 6-8 digit access code valid from 30 minutes before pickup until the return deadline plus grace period
5. IF payment fails THEN the system SHALL display clear error messages and allow retry without losing reservation details

### Requirement 6: Access Code Management
**User Story:** As a customer, I want to receive a secure access code, so that I can retrieve my rented tool from the locker

#### Acceptance Criteria
1. WHEN a reservation is confirmed THEN the system SHALL create a time-bound numeric PIN code through the cloud locker API
2. WHEN the access code is created THEN the system SHALL set validity from pickup time minus 30 minutes to return time plus grace period in America/Denver timezone
3. WHEN the locker provider API is unavailable THEN the system SHALL generate a local code, store it with 'provider_sync_pending' flag, and notify administrators
4. WHEN codes are created THEN the system SHALL ensure uniqueness and collision protection across all active reservations

### Requirement 7: Reservation Confirmation and Communication
**User Story:** As a customer, I want to receive confirmation of my reservation, so that I have all necessary information for pickup and return

#### Acceptance Criteria
1. WHEN payment is successful THEN the system SHALL send confirmation via both SMS and email containing access code, pickup address, and instructions
2. WHEN the reservation is 12 hours before pickup THEN the system SHALL send a reminder notification
3. WHEN the reservation is 2 hours before return deadline THEN the system SHALL send a return reminder notification
4. IF the tool is returned late THEN the system SHALL send overdue notices according to the grace period policy

### Requirement 8: User Authentication and Accounts
**User Story:** As a customer, I want to create an account and sign in, so that I can manage my reservations and rental history

#### Acceptance Criteria
1. WHEN a customer wants to create an account THEN the system SHALL support email/passwordless authentication and OAuth providers through Clerk
2. WHEN a customer completes checkout as a guest THEN the system SHALL optionally create a lightweight user account using Clerk API
3. WHEN authenticated users access protected routes THEN the system SHALL verify JWT session tokens and role claims
4. WHEN users access their account page THEN the system SHALL display current and past reservations with status and details

### Requirement 9: Administrative Role Management
**User Story:** As a business owner, I want to access administrative functions, so that I can manage the rental operation

#### Acceptance Criteria
1. WHEN users are assigned roles THEN the system SHALL use Clerk user metadata with publicMetadata.role set to 'ADMIN' or 'CUSTOMER'
2. WHEN admin users access /admin routes THEN the system SHALL verify administrative role permissions
3. WHEN admin users need to manage locker codes THEN the system SHALL provide endpoints to create, regenerate, and delete access codes
4. WHEN the locker provider status changes THEN the system SHALL display provider status and manual override instructions in admin UI

### Requirement 10: API-First Architecture
**User Story:** As a developer, I want clean versioned APIs, so that future native mobile apps can be built without backend rewrites

#### Acceptance Criteria
1. WHEN API endpoints are accessed THEN the system SHALL provide REST v1 APIs under /api/v1 base path with OpenAPI 3 documentation
2. WHEN API requests are made THEN the system SHALL support JWT authentication, rate limiting, idempotency keys, and request tracing
3. WHEN API responses are returned THEN the system SHALL use cursor-based pagination for lists and structured error responses
4. WHEN webhooks are configured THEN the system SHALL emit events for reservation.created, reservation.updated, payment.succeeded, and locker.code.created

### Requirement 11: Time Zone and Scheduling
**User Story:** As a Utah County customer, I want all times displayed in local timezone, so that pickup and return times are clear and accurate

#### Acceptance Criteria
1. WHEN displaying dates and times THEN the system SHALL use America/Denver timezone for all customer-facing information
2. WHEN calculating code validity windows THEN the system SHALL compute pickup and return times in local timezone before sending to locker provider
3. WHEN applying dynamic pricing THEN the system SHALL determine weekends and holidays based on America/Denver timezone
4. WHEN sending notifications THEN the system SHALL schedule reminders based on local pickup and return times

### Requirement 12: Payment and Deposit Handling
**User Story:** As a customer, I want transparent pricing with secure payments, so that I understand all costs and feel confident in the transaction

#### Acceptance Criteria
1. WHEN viewing pricing THEN the system SHALL display itemized costs including base rate, taxes, fees, and refundable deposits
2. WHEN processing payments THEN the system SHALL use Stripe for secure card processing with PCI compliance
3. WHEN deposits are required THEN the system SHALL handle deposits as either authorization holds or separate charge/refund transactions
4. WHEN refunds are needed THEN the system SHALL process refunds through Stripe with audit logging

### Requirement 13: Data Security and Privacy
**User Story:** As a customer, I want my personal and payment information protected, so that I can use the service with confidence

#### Acceptance Criteria
1. WHEN the application loads THEN the system SHALL enforce HTTPS-only connections with HSTS headers
2. WHEN serving content THEN the system SHALL implement Content Security Policy with strict-dynamic for third-party integrations
3. WHEN storing sensitive data THEN the system SHALL encrypt secrets at rest and implement regular key rotation
4. WHEN processing webhooks THEN the system SHALL verify webhook signatures from Clerk and Stripe

### Requirement 14: Performance and Reliability
**User Story:** As a mobile user, I want fast loading and reliable access, so that I can complete rentals efficiently even with poor connectivity

#### Acceptance Criteria
1. WHEN the PWA loads THEN the system SHALL achieve Lighthouse PWA score ≥ 90 and installability criteria
2. WHEN implementing caching THEN the system SHALL use cache-first strategy for static assets, stale-while-revalidate for tool data, and network-first for account pages
3. WHEN network connectivity is lost THEN the system SHALL queue reservation attempts for background sync retry
4. WHEN background sync is available THEN the system SHALL retry failed reservation confirmations using the 'reservationAttempts' queue

### Requirement 15: Inventory and Availability Management
**User Story:** As a business owner, I want accurate availability tracking, so that double-bookings are prevented and customers see current tool status

#### Acceptance Criteria
1. WHEN tools are reserved THEN the system SHALL decrement availability for the selected dates and prevent overbooking
2. WHEN displaying availability THEN the system SHALL show real-time availability status on tool cards and detail pages
3. WHEN calculating availability THEN the system SHALL account for pickup time, return time, and cleaning/maintenance buffers
4. WHEN tools are returned THEN the system SHALL update availability for future bookings based on inspection and maintenance needs