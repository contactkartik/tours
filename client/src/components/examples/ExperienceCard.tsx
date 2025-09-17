import ExperienceCard from '../ExperienceCard'

export default function ExperienceCardExample() {
  return (
    <div className="max-w-sm">
      <ExperienceCard
        id="1"
        title="Amazing Rajasthan Desert Safari"
        location="Jaisalmer, Rajasthan"
        price={2499}
        originalPrice={3499}
        rating={4.8}
        reviewCount={127}
        duration="3 Days"
        groupSize="2-8 People"
        category="Adventure"
        image="/api/placeholder/400/300"
        featured={true}
      />
    </div>
  )
}