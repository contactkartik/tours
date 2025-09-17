import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Search, MapPin, Users } from 'lucide-react'
import { format } from 'date-fns'

export default function HeroSection() {
  const [destination, setDestination] = useState('')
  const [category, setCategory] = useState('')
  const [guests, setGuests] = useState('')
  const [date, setDate] = useState<Date>()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const categories = [
    'Adventure Tours',
    'Cultural Experiences',
    'Wildlife Safaris', 
    'Beach Activities',
    'Mountain Treks',
    'City Tours',
    'Spiritual Journeys',
    'Food Tours'
  ]

  const guestOptions = ['1 Guest', '2 Guests', '3-5 Guests', '6-10 Guests', '10+ Guests']

  const handleSearch = () => {
    const searchData = { destination, category, guests, date }
    console.log('Search submitted:', searchData)
    
    // Build search URL with query parameters
    const searchParams = new URLSearchParams()
    if (destination) searchParams.append('search', destination)
    if (category) searchParams.append('category', category)
    
    // For a full implementation, you would navigate to a search results page
    // For now, we'll just log the search and trigger an event
    const searchUrl = `/search?${searchParams.toString()}`
    console.log('Would navigate to:', searchUrl)
    
    // In a real app, you would use router to navigate:
    // useLocation hook from wouter and navigate to search results page
    window.dispatchEvent(new CustomEvent('heroSearch', { 
      detail: searchData 
    }))
  }

  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6" data-testid="text-hero-title">
            Discover Incredible 
            <span className="text-primary"> India</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8" data-testid="text-hero-subtitle">
            From ancient temples to pristine beaches, thrilling adventures to cultural immersions - 
            find and book your perfect Indian experience with BookKaroIndia.
          </p>
        </div>

        <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Where to?
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10"
                  data-testid="input-destination"
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Experience Type
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger data-testid="select-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                When?
              </label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    data-testid="button-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate)
                      setIsCalendarOpen(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="lg:col-span-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Guests
              </label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger data-testid="select-guests">
                  <SelectValue placeholder="How many?" />
                </SelectTrigger>
                <SelectContent>
                  {guestOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        {option}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-1 flex items-end">
              <Button 
                className="w-full"
                onClick={handleSearch}
                size="lg"
                data-testid="button-search"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Goa Beaches', 'Kerala Backwaters', 'Rajasthan Desert', 'Himachal Treks', 'Golden Triangle'].map((tag) => (
              <Button 
                key={tag}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setDestination(tag)
                  console.log('Quick search:', tag)
                }}
                data-testid={`button-quick-${tag.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}