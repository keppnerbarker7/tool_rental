# Clerk Authentication Setup

## Getting Started with Clerk

1. **Create a Clerk Account**
   - Go to [https://clerk.com](https://clerk.com)
   - Sign up for a free account
   - Create a new application

2. **Get Your API Keys**
   - In your Clerk dashboard, go to "API Keys"
   - Copy the "Publishable Key" and "Secret Key"

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Update the Clerk variables in `.env.local`:
     ```bash
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
     CLERK_SECRET_KEY=sk_test_your_secret_key_here
     ```

4. **Configure Clerk Settings**
   - In your Clerk dashboard, go to "Paths"
   - Set the sign-in path to: `/sign-in`
   - Set the sign-up path to: `/sign-up`
   - Set the home URL to: `/admin`

5. **Test the Authentication**
   - Start your development server: `npm run dev`
   - Navigate to `http://localhost:3000`
   - Click "Admin" in the header
   - You should be redirected to the sign-in page
   - Create an account or sign in
   - You should be redirected to the admin dashboard

## Features Included

- **Protected Admin Routes**: Only authenticated users can access `/admin/*` pages
- **Sign In/Sign Up Pages**: Custom styled authentication pages
- **User Management**: Clerk's built-in user management
- **Session Management**: Automatic session handling
- **Responsive Design**: Mobile-friendly authentication forms

## Admin Access

- Navigate to the homepage
- Click "Admin" in the navigation header
- Sign in or create an account
- Access the full admin dashboard

## Troubleshooting

**Authentication not working?**
- Check that your environment variables are correct
- Make sure you're using `.env.local` (not `.env`)
- Restart your development server after adding environment variables

**Redirects not working?**
- Verify the paths in your Clerk dashboard match the configuration
- Check that the redirect URLs are set correctly in your Clerk app settings

**Need help?**
- Check the [Clerk documentation](https://clerk.com/docs)
- Review the Clerk Next.js integration guide