import { SignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function SignInPage() {
  const { userId } = await auth()

  // If user is already signed in, redirect to account page
  if (userId) {
    redirect('/account')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center text-slate-600 hover:text-blue-600 mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </Link>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg mb-4">
              <span className="text-white font-black text-2xl">TL</span>
            </div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3">
            Welcome Back
          </h1>
          <p className="text-lg text-slate-600">
            Sign in to manage your tool rentals
          </p>
        </div>

        {/* Clerk Sign In Component */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 bg-transparent p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all font-semibold",
                formButtonPrimary: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all font-bold py-3 shadow-lg hover:shadow-xl",
                footerActionLink: "text-blue-600 hover:text-blue-700 font-semibold",
                formFieldInput: "rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 py-3 px-4 text-base",
                formFieldLabel: "font-semibold text-slate-700 mb-2",
                dividerLine: "bg-slate-300",
                dividerText: "text-slate-500 font-medium",
                identityPreviewText: "font-medium",
                formFieldInputShowPasswordButton: "text-slate-500 hover:text-slate-700"
              }
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/account"
          />
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-base text-slate-600">
            Don't have an account?{' '}
            <Link
              href="/sign-up"
              className="text-blue-600 hover:text-blue-700 font-bold transition-colors hover:underline"
            >
              Create one now →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}