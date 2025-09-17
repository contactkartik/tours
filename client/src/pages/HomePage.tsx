import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ExperienceCard from '@/components/ExperienceCard'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import type { Experience } from '@shared/schema'

function ExperienceCardSkeleton() {
  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-lg hover-elevate">
      <Skeleton className="w-full h-64" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  // Fetch experiences data
  const { data: experiences = [], isLoading, error } = useQuery<Experience[]>({
    queryKey: ['/api/experiences'],
  })

  // Fetch categories for the category section
  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ['/api/categories'],
  })

  const handleBookExperience = (experience: Experience) => {
    setSelectedExperience(experience)
    setShowBookingForm(true)
    console.log('Booking experience:', experience.title)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Experiences Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-featured-title">
            Featured Experiences
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular and highly-rated experiences across incredible India
          </p>
        </div>
        
        {/* Error state */}
        {error && (
          <div className="text-center py-8">
            <p className="text-destructive mb-4">Failed to load experiences. Please try again later.</p>
            <Button onClick={() => window.location.reload()}>Refresh Page</Button>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <ExperienceCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Experiences grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {experiences.map((experience) => (
              <div key={experience.id} className="relative">
                <ExperienceCard 
                  id={experience.id}
                  title={experience.title}
                  location={experience.location}
                  price={parseFloat(experience.price)}
                  originalPrice={experience.originalPrice ? parseFloat(experience.originalPrice) : undefined}
                  rating={parseFloat(experience.rating)}
                  reviewCount={experience.reviewCount}
                  duration={experience.duration}
                  groupSize={experience.groupSize}
                  category={experience.category}
                  image={experience.image}
                  featured={experience.featured}
                />
                <Button 
                  className="absolute bottom-4 right-4 z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBookExperience(experience)
                  }}
                  data-testid={`button-quick-book-${experience.id}`}
                >
                  Quick Book
                </Button>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && experiences.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No experiences available at the moment.</p>
          </div>
        )}

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => console.log('View all experiences clicked')}
            data-testid="button-view-all"
          >
            View All Experiences
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect experience for your travel style
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Adventure', icon: '🏔️', count: experiences.filter(e => e.category === 'Adventure').length },
              { name: 'Cultural', icon: '🏛️', count: experiences.filter(e => e.category === 'Cultural').length },
              { name: 'Beach', icon: '🏖️', count: experiences.filter(e => e.category === 'Beach').length },
              { name: 'Food', icon: '🍛', count: experiences.filter(e => e.category === 'Food').length },
              { name: 'Wildlife', icon: '🦁', count: experiences.filter(e => e.category === 'Wildlife').length },
              { name: 'Spiritual', icon: '🙏', count: experiences.filter(e => e.category === 'Spiritual').length },
              { name: 'City Tours', icon: '🏙️', count: experiences.filter(e => e.category === 'City Tours').length },
              { name: 'Festivals', icon: '🎭', count: experiences.filter(e => e.category === 'Festivals').length }
            ].map((category) => (
              <Button
                key={category.name}
                variant="outline"
                className="h-24 flex-col hover-elevate"
                onClick={() => console.log('Category clicked:', category.name)}
                data-testid={`button-category-${category.name.toLowerCase()}`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="font-medium">{category.name}</div>
                <div className="text-xs text-muted-foreground">
                  {category.count} experience{category.count !== 1 ? 's' : ''}
                </div>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose BookKaroIndia?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Verified Experiences',
                description: 'All our experiences are verified and reviewed by our quality team',
                icon: '✅'
              },
              {
                title: 'Local Experts',
                description: 'Connect with authentic local guides who know the real India',
                icon: '👥'
              },
              {
                title: 'Best Price Guarantee',
                description: 'We guarantee the best prices with no hidden fees or charges',
                icon: '💰'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Booking Form Modal */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Booking</DialogTitle>
          </DialogHeader>
          {selectedExperience && (
            <BookingForm 
              experienceTitle={selectedExperience.title}
              price={parseFloat(selectedExperience.price)}
              experienceId={selectedExperience.id}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}