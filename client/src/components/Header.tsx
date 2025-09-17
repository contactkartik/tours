import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Menu, X, User, Heart, ShoppingBag } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export default function Header() {
  const [location] = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Adventures', href: '/adventures' },
    { label: 'Cultural Tours', href: '/cultural' },
    { label: 'About', href: '/about' }
  ]

  const handleSearch = () => {
    console.log('Search triggered:', searchQuery)
    // TODO: Remove mock functionality - implement real search
  }

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover-elevate">
            <div className="text-2xl font-bold text-primary" data-testid="text-logo">
              BookKaro<span className="text-foreground">India</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover-elevate ${
                  location === item.href 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search experiences..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                data-testid="input-search"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {/* User Actions */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => console.log('Wishlist clicked')}
                data-testid="button-wishlist"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => console.log('Cart clicked')}
                data-testid="button-cart"
              >
                <ShoppingBag className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => console.log('Profile clicked')}
                data-testid="button-profile"
              >
                <User className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t" data-testid="nav-mobile">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search experiences..."
                  className="pl-10 pr-4 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  data-testid="input-search-mobile"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium hover-elevate ${
                    location === item.href 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`link-nav-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t">
              <Button 
                variant="ghost"
                onClick={() => console.log('Wishlist clicked')}
                data-testid="button-wishlist-mobile"
              >
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
              <Button 
                variant="ghost"
                onClick={() => console.log('Cart clicked')}
                data-testid="button-cart-mobile"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Cart
              </Button>
              <Button 
                variant="ghost"
                onClick={() => console.log('Profile clicked')}
                data-testid="button-profile-mobile"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}