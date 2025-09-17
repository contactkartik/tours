import { Link } from 'wouter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'How it Works', href: '/how-it-works' },
    { label: 'Safety', href: '/safety' },
    { label: 'Trust & Safety', href: '/trust-safety' },
    { label: 'Help Center', href: '/help' }
  ]

  const categories = [
    { label: 'Adventure Tours', href: '/adventures' },
    { label: 'Cultural Experiences', href: '/cultural' },
    { label: 'Wildlife Safaris', href: '/wildlife' },
    { label: 'Beach Activities', href: '/beach' },
    { label: 'Mountain Treks', href: '/mountains' }
  ]

  const destinations = [
    { label: 'Goa', href: '/destinations/goa' },
    { label: 'Kerala', href: '/destinations/kerala' },
    { label: 'Rajasthan', href: '/destinations/rajasthan' },
    { label: 'Himachal Pradesh', href: '/destinations/himachal' },
    { label: 'Tamil Nadu', href: '/destinations/tamil-nadu' }
  ]

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    console.log('Newsletter signup:', email)
    // TODO: Remove mock functionality - implement real newsletter signup
  }

  return (
    <footer className="bg-muted/50 border-t mt-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl font-bold text-primary">
                  BookKaro<span className="text-foreground">India</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Discover the incredible diversity of India through authentic experiences. 
                From adventure tours to cultural immersions, we connect you with unforgettable journeys.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>hello@bookkaroindia.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Experiences</h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.href}>
                    <Link
                      href={category.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      data-testid={`link-footer-category-${category.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Destinations</h3>
              <ul className="space-y-3">
                {destinations.map((destination) => (
                  <li key={destination.href}>
                    <Link
                      href={destination.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      data-testid={`link-footer-destination-${destination.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {destination.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest travel deals and destination guides delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                data-testid="input-newsletter"
              />
              <Button type="submit" data-testid="button-newsletter">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 BookKaroIndia. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log('Facebook clicked')}
                data-testid="button-social-facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log('Twitter clicked')}
                data-testid="button-social-twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log('Instagram clicked')}
                data-testid="button-social-instagram"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log('YouTube clicked')}
                data-testid="button-social-youtube"
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-privacy"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-terms"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}