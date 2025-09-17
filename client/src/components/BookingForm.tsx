import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { apiRequest } from '@/lib/queryClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, CreditCard, Shield, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'

interface BookingFormProps {
  experienceTitle?: string
  price?: number
  experienceId?: string
}

export default function BookingForm({ 
  experienceTitle = "Amazing Rajasthan Desert Safari",
  price = 2499,
  experienceId = ""
}: BookingFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Guest Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: '1',
    
    // Booking Details
    date: undefined as Date | undefined,
    specialRequests: '',
    
    // Payment Details
    paymentMethod: '',
    
    // Agreement
    acceptTerms: false
  })

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    console.log('Next step clicked, current data:', formData)
    setStep(prev => prev + 1)
    // TODO: Remove mock functionality - implement real validation
  }

  const handlePrevious = () => {
    setStep(prev => prev - 1)
  }

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const response = await apiRequest('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
        headers: { 'Content-Type': 'application/json' }
      });
      return response;
    },
    onSuccess: () => {
      setStep(4); // Success step
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
    onError: (error: any) => {
      console.error('Booking failed:', error);
      // You can show error to user here
    }
  });

  const handleSubmit = () => {
    if (!formData.date || !experienceId) {
      console.error('Missing required fields');
      return;
    }

    const bookingData = {
      experienceId,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      bookingDate: formData.date.toISOString(),
      guests: parseInt(formData.guests),
      specialRequests: formData.specialRequests || null,
      status: 'pending'
    };

    bookingMutation.mutate(bookingData);
  }

  const totalPrice = price * parseInt(formData.guests || '1')

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span data-testid="text-booking-title">Book Your Experience</span>
            <div className="text-sm text-muted-foreground">
              Step {step} of 3
            </div>
          </CardTitle>
          <p className="text-muted-foreground">{experienceTitle}</p>
        </CardHeader>

        <CardContent>
          {/* Step 1: Guest Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    placeholder="Enter first name"
                    data-testid="input-first-name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    placeholder="Enter last name"
                    data-testid="input-last-name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="Enter email address"
                  data-testid="input-email"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="Enter phone number"
                  data-testid="input-phone"
                />
              </div>

              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Select 
                  value={formData.guests} 
                  onValueChange={(value) => updateFormData('guests', value)}
                >
                  <SelectTrigger data-testid="select-guests">
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Booking Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      data-testid="button-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => updateFormData('date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => updateFormData('specialRequests', e.target.value)}
                  placeholder="Any dietary restrictions, accessibility needs, or special occasions?"
                  rows={4}
                  data-testid="textarea-special-requests"
                />
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Experience:</span>
                    <span>{experienceTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{formData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per person:</span>
                    <span>₹{price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span data-testid="text-total-price">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label>Payment Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                  {['UPI', 'Credit Card', 'Debit Card'].map((method) => (
                    <Button
                      key={method}
                      variant={formData.paymentMethod === method ? 'default' : 'outline'}
                      className="h-12"
                      onClick={() => updateFormData('paymentMethod', method)}
                      data-testid={`button-payment-${method.toLowerCase().replace(' ', '-')}`}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      {method}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-start">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-800 dark:text-green-200">Secure Payment</p>
                  <p className="text-green-700 dark:text-green-300">
                    Your payment information is encrypted and secure. We never store your payment details.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.acceptTerms}
                    onChange={(e) => updateFormData('acceptTerms', e.target.checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-5">
                    I agree to the Terms of Service and Privacy Policy. I understand the cancellation policy and booking terms.
                  </Label>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">Final Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Guest:</span>
                    <span>{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{formData.date ? format(formData.date, "PPP") : "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{formData.guests}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2 text-lg">
                    <span>Total Amount:</span>
                    <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2" data-testid="text-success-title">
                Booking Confirmed!
              </h3>
              <p className="text-muted-foreground mb-6">
                Thank you for your booking. We've sent a confirmation email to {formData.email}
              </p>
              <div className="bg-muted rounded-lg p-4 text-left max-w-md mx-auto mb-6">
                <h4 className="font-semibold mb-2">Booking Details</h4>
                <div className="space-y-1 text-sm">
                  <div>Booking ID: #BKI{Date.now()}</div>
                  <div>Experience: {experienceTitle}</div>
                  <div>Guest: {formData.firstName} {formData.lastName}</div>
                  <div>Total Paid: ₹{totalPrice.toLocaleString()}</div>
                </div>
              </div>
              <Button 
                onClick={() => console.log('Download confirmation clicked')}
                data-testid="button-download-confirmation"
              >
                Download Confirmation
              </Button>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
                data-testid="button-previous"
              >
                Previous
              </Button>
              
              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && (!formData.firstName || !formData.lastName || !formData.email)) ||
                    (step === 2 && !formData.date)
                  }
                  data-testid="button-next"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.paymentMethod || !formData.acceptTerms || bookingMutation.isPending}
                  data-testid="button-submit-booking"
                >
                  {bookingMutation.isPending 
                    ? 'Processing Booking...' 
                    : `Complete Booking - ₹${totalPrice.toLocaleString()}`}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}