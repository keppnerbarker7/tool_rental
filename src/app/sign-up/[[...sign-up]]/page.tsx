import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary:
              'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white',
            card: 'shadow-2xl',
            headerTitle: 'text-2xl font-bold',
            headerSubtitle: 'text-slate-600',
            socialButtonsBlockButton:
              'border-slate-300 hover:bg-slate-50',
            formFieldLabel: 'text-slate-700 font-medium',
            formFieldInput:
              'border-slate-300 focus:border-blue-500 focus:ring-blue-500',
            footerActionLink:
              'text-blue-600 hover:text-blue-700 font-medium'
          }
        }}
      />
    </div>
  )
}