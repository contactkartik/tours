import React, { useState } from "react";
import { useLocation } from "wouter";

const reviews = [
  {
    user: "Amit Sharma",
    review: "Amazing experience! The booking process was smooth and the trip was unforgettable.",
    blog: `Manali Diaries: I booked my Manali trip through BookKaroIndia and everything was seamless. From the scenic drive to the cozy homestay, every moment was memorable. Highly recommend exploring the Solang Valley and trying local Himachali cuisine!`
  },
  {
    user: "Priya Singh",
    review: "Loved the customer support and the curated experiences. Highly recommended!",
    blog: `Rajasthan Adventure: My journey through Rajasthan was filled with vibrant colors, majestic forts, and delicious food. BookKaroIndia helped me discover hidden gems in Jaipur and Udaipur. Read my full blog for tips on camel safaris and local shopping!`
  },
  {
    user: "Rahul Verma",
    review: "Easy to use platform and great deals. Will book again!",
    blog: `Goa Getaway: Goa is always a good idea! Thanks to BookKaroIndia, I found the best beachside resort and enjoyed water sports. Don’t miss the Saturday Night Market and the seafood at local shacks. My blog covers the top 5 beaches to visit!`
  },
  {
    user: "Sneha Patel",
    review: "The Kerala backwaters experience was magical. The houseboat stay was a dream come true!",
    blog: `Kerala Backwaters: Floating through the serene backwaters of Alleppey was the highlight of my trip. BookKaroIndia made the booking easy and stress-free. Read my blog for a guide to houseboat stays and local attractions.`
  },
  {
    user: "Vikram Joshi",
    review: "Exploring the Northeast was a bucket-list moment. The local guides were fantastic!",
    blog: `Northeast Explorer: From Kaziranga’s wildlife to the living root bridges in Meghalaya, every day was an adventure. BookKaroIndia connected me with amazing local guides. My blog shares tips for first-time visitors to Assam and Meghalaya.`
  },
  {
    user: "Riya Kapoor",
    review: "Trekking in Uttarakhand was challenging but rewarding. The views were breathtaking!",
    blog: `Uttarakhand Trekking: I joined a group trek to Valley of Flowers and Hemkund Sahib. The landscapes were stunning and the group was super friendly. BookKaroIndia’s support made the logistics easy. Read my blog for packing tips and route details.`
  }
];

export default function ExperiencesPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [, setLocation] = useLocation();
  const handleViewDetails = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };
  const handleBook = (exp: typeof reviews[0]) => {
    // Previous placeholder booking logic
    alert(`Quick book for: ${exp.user}`);
  };
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">User Experiences</h1>
      <div className="space-y-8">
        {reviews.map((exp, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{exp.user}</h2>
            <p className="mb-2 text-gray-700">{exp.review}</p>
            <p className="italic text-blue-600">{exp.blog}</p>
            <div className="flex gap-4 mt-4">
              <button className="px-4 py-2 rounded bg-primary text-white font-bold" onClick={() => handleViewDetails(idx)}>
                {openIdx === idx ? "Hide Details" : "View Details"}
              </button>
              <button className="px-4 py-2 rounded bg-orange-500 text-white font-bold" onClick={() => handleBook(exp)}>
                Book
              </button>
            </div>
            {openIdx === idx && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border">
                <h3 className="text-lg font-bold mb-2">Experience Details</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Destination: Sample destination for {exp.user}</li>
                  <li>Duration: 5 days / 4 nights</li>
                  <li>Highlights: Guided tours, local cuisine, adventure activities</li>
                  <li>Includes: Accommodation, meals, transfers</li>
                  <li>Contact: support@bookkaroindia.com</li>
                </ul>
                <p className="mt-2 text-sm text-muted-foreground">* This is sample content. Actual details will be shown here.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
