import { useState } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ExperienceCard from '@/components/ExperienceCard'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

// TODO: Remove mock data when implementing real functionality
const mockExperiences = [
  {
    id: "1",
    title: "Amazing Rajasthan Desert Safari",
    location: "Jaisalmer, Rajasthan",
    price: 2499,
    originalPrice: 3499,
    rating: 4.8,
    reviewCount: 127,
    duration: "3 Days",
    groupSize: "2-8 People",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: "2", 
    title: "Kerala Backwater Cruise",
    location: "Alleppey, Kerala",
    price: 1899,
    rating: 4.7,
    reviewCount: 89,
    duration: "2 Days",
    groupSize: "2-6 People", 
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    title: "Himalayan Trek Experience", 
    location: "Manali, Himachal Pradesh",
    price: 3299,
    originalPrice: 3999,
    rating: 4.9,
    reviewCount: 156,
    duration: "5 Days",
    groupSize: "4-12 People",
    category: "Adventure", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  {
    id: "4",
    title: "Goa Beach Paradise",
    location: "North Goa, Goa", 
    price: 1299,
    rating: 4.5,
    reviewCount: 203,
    duration: "1 Day",
    groupSize: "1-10 People",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
  },
  {
    id: "5",
    title: "Tamil Nadu Temple Tour",
    location: "Madurai, Tamil Nadu",
    price: 1799,
    rating: 4.6, 
    reviewCount: 94,
    duration: "2 Days",
    groupSize: "3-15 People",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=400&h=300&fit=crop"
  },
  {
    id: "6",
    title: "Mumbai Street Food Tour",
    location: "Mumbai, Maharashtra",
    price: 599,
    rating: 4.4,
    reviewCount: 178,
    duration: "4 Hours", 
    groupSize: "2-8 People",
    category: "Food",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop"
  }
]

export default function HomePage() {
  const [selectedExperience, setSelectedExperience] = useState<typeof mockExperiences[0] | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const handleBookExperience = (experience: typeof mockExperiences[0]) => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockExperiences.map((experience) => (
            <div key={experience.id} className="relative">
              <ExperienceCard {...experience} />
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
              { name: 'Adventure', icon: '🏔️', count: 45 },
              { name: 'Cultural', icon: '🏛️', count: 67 },
              { name: 'Beach', icon: '🏖️', count: 32 },
              { name: 'Food', icon: '🍛', count: 28 },
              { name: 'Wildlife', icon: '🦁', count: 23 },
              { name: 'Spiritual', icon: '🙏', count: 41 },
              { name: 'City Tours', icon: '🏙️', count: 52 },
              { name: 'Festivals', icon: '🎭', count: 19 }
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
                <div className="text-xs text-muted-foreground">{category.count} experiences</div>
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
              price={selectedExperience.price}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}