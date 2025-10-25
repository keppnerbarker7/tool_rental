import { auth, currentUser } from '@clerk/nextjs/server';
import type { User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export type UserRole = 'ADMIN' | 'STAFF' | 'CUSTOMER';

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
}

/**
 * Admin allowlist from environment variables
 * Set CLERK_ADMIN_EMAILS to a comma-separated list of admin email addresses
 * Example: CLERK_ADMIN_EMAILS=admin@example.com,superadmin@example.com
 */
const adminEmails = (process.env.CLERK_ADMIN_EMAILS || process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

/**
 * Staff allowlist from environment variables
 * Set CLERK_STAFF_EMAILS to a comma-separated list of staff email addresses
 * Example: CLERK_STAFF_EMAILS=staff1@example.com,staff2@example.com
 */
const staffEmails = (process.env.CLERK_STAFF_EMAILS || process.env.STAFF_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

/**
 * Resolve user role based on allowlist and metadata
 *
 * Priority order:
 * 1. CLERK_ADMIN_EMAILS environment variable (highest priority)
 * 2. CLERK_STAFF_EMAILS environment variable
 * 3. Clerk metadata (only for admin if allowlist is empty, always for staff)
 * 4. Default to CUSTOMER
 *
 * Security: Admin privileges via metadata are blocked when allowlist exists
 */
function resolveUserRole(user: User): UserRole {
  const primaryEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase() ?? '';

  // Check admin allowlist first (highest priority)
  if (primaryEmail && adminEmails.includes(primaryEmail)) {
    return 'ADMIN';
  }

  // Check staff allowlist
  if (primaryEmail && staffEmails.includes(primaryEmail)) {
    return 'STAFF';
  }

  // Check metadata for role
  const metadataRole =
    (user.publicMetadata?.role as UserRole | undefined) ||
    (user.privateMetadata?.role as UserRole | undefined);

  if (metadataRole === 'ADMIN') {
    // Only allow metadata-promoted admins when no explicit allowlist is configured
    // This prevents unauthorized admin promotion when allowlist is in use
    return adminEmails.length === 0 ? 'ADMIN' : 'CUSTOMER';
  }

  if (metadataRole === 'STAFF') {
    return 'STAFF';
  }

  // Default to customer role
  return 'CUSTOMER';
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const user = await currentUser();
    if (!user) return null;

    const role = resolveUserRole(user);

    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
      role,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Require authentication and optionally a specific role
 */
export async function requireAuth(requiredRole?: UserRole): Promise<AuthUser> {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (requiredRole && !hasRole(user, requiredRole)) {
    throw new Error(`Access denied. Required role: ${requiredRole}`);
  }

  return user;
}

/**
 * Check if user has required role
 */
export function hasRole(user: AuthUser, requiredRole: UserRole): boolean {
  const roleHierarchy = {
    'CUSTOMER': 0,
    'STAFF': 1,
    'ADMIN': 2
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

/**
 * Role guard helper for API routes
 */
export async function requireRole(requiredRole: UserRole): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Authentication required');
  }

  if (!hasRole(user, requiredRole)) {
    throw new Error(`Access denied. Required role: ${requiredRole}`);
  }

  return user;
}

/**
 * Check if current user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'ADMIN';
}

/**
 * Check if current user is staff or admin
 */
export async function isStaff(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'STAFF' || user?.role === 'ADMIN';
}
