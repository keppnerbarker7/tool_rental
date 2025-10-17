import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Tool Locker Utah Valley</h3>
            <p className="text-sm text-muted-foreground">
              Rent professional tools by the day. Simple, secure, self-service.
            </p>
            <p className="text-sm text-muted-foreground">
              Utah County, UT
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools" className="text-muted-foreground hover:text-foreground">
                  Browse Tools
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground">
                  Support & Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Tool Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools?category=pressure-washers" className="text-muted-foreground hover:text-foreground">
                  Pressure Washers
                </Link>
              </li>
              <li>
                <Link href="/tools?category=carpet-cleaners" className="text-muted-foreground hover:text-foreground">
                  Carpet Cleaners
                </Link>
              </li>
              <li>
                <Link href="/tools?category=lawn-garden" className="text-muted-foreground hover:text-foreground">
                  Lawn & Garden
                </Link>
              </li>
              <li>
                <Link href="/tools?category=paint-sprayers" className="text-muted-foreground hover:text-foreground">
                  Paint Sprayers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground">
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-muted-foreground hover:text-foreground">
                  Your Account
                </Link>
              </li>
              <li>
                <a href="tel:+18015550123" className="text-muted-foreground hover:text-foreground">
                  (801) 555-0123
                </a>
              </li>
              <li>
                <a href="mailto:support@uvtoolrental.com" className="text-muted-foreground hover:text-foreground">
                  Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tool Locker Utah Valley. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}