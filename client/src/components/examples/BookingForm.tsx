import BookingForm from '../BookingForm'

export default function BookingFormExample() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <BookingForm 
        experienceTitle="Amazing Rajasthan Desert Safari"
        price={2499}
      />
    </div>
  )
}