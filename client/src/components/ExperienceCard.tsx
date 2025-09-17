import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Calendar, Users, Heart } from 'lucide-react'

interface ExperienceCardProps {
  id: string
  title: string
  location: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  duration: string
  groupSize: string
  category: string
  image: string
  featured?: boolean
}

export default function ExperienceCard({
  id,
  title,
  location,
  price,
  originalPrice,
  rating,
  reviewCount,
  duration,
  groupSize,
  category,
  image,
  featured = false
}: ExperienceCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    console.log(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist:`, title)
    // TODO: Remove mock functionality - implement real wishlist
  }

  const handleBookNow = () => {
    console.log('Book now clicked for:', title)
    // TODO: Remove mock functionality - implement real booking
  }

  const handleViewDetails = () => {
    console.log('View details clicked for:', title)
    // TODO: Remove mock functionality - implement real navigation
  }

  return (
    <Card className={`group cursor-pointer hover-elevate ${featured ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="p-0 relative">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            onClick={handleViewDetails}
            data-testid={`img-experience-${id}`}
          />
          
          {/* Overlay badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {category}
            </Badge>
            {featured && (
              <Badge className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                {discount}% OFF
              </Badge>
            )}
          </div>
          
          {/* Wishlist button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm hover:bg-background"
            onClick={(e) => {
              e.stopPropagation()
              handleWishlist()
            }}
            data-testid={`button-wishlist-${id}`}
          >
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-destructive text-destructive' : ''}`} 
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Title */}
        <h3 
          className="font-semibold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-primary"
          onClick={handleViewDetails}
          data-testid={`text-title-${id}`}
        >
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm" data-testid={`text-location-${id}`}>
            {location}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-sm font-medium mr-1" data-testid={`text-rating-${id}`}>
            {rating}
          </span>
          <span className="text-sm text-muted-foreground" data-testid={`text-reviews-${id}`}>
            ({reviewCount} reviews)
          </span>
        </div>

        {/* Details */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span data-testid={`text-duration-${id}`}>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span data-testid={`text-group-size-${id}`}>{groupSize}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary" data-testid={`text-price-${id}`}>
                ₹{price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">per person</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handleViewDetails}
          data-testid={`button-details-${id}`}
        >
          View Details
        </Button>
        <Button 
          className="flex-1"
          onClick={handleBookNow}
          data-testid={`button-book-${id}`}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  )
}