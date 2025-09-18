import React, { useState, ChangeEvent, FormEvent } from "react";

const hotelOptions = [
  { city: "Goa", area: "Calangute Beach" },
  { city: "Delhi", area: "Connaught Place" },
  { city: "Mumbai", area: "Marine Drive" },
  { city: "Jaipur", area: "Pink City" },
  { city: "Bangalore", area: "MG Road" },
  { city: "Chennai", area: "T Nagar" }
];

const dummyHotels = [
  { name: "Sunset Resort", city: "Goa", area: "Calangute Beach", price: "₹3,200/night" },
  { name: "Royal Palace", city: "Jaipur", area: "Pink City", price: "₹2,800/night" },
  { name: "City Comfort", city: "Delhi", area: "Connaught Place", price: "₹4,000/night" },
  { name: "Seaside Inn", city: "Mumbai", area: "Marine Drive", price: "₹3,500/night" },
  { name: "Green Leaf", city: "Bangalore", area: "MG Road", price: "₹2,900/night" }
];

export default function HotelsPage() {
  const [tab, setTab] = useState<'hotels' | 'hostels' | 'resorts'>('hotels');
  const [form, setForm] = useState({
    city: "",
    checkin: "",
    checkout: "",
    guests: 1,
    roomType: "Standard",
    defence: false,
    student: false,
    senior: false,
    doctor: false,
    hotelOffer: false
  });
  const [results, setResults] = useState(dummyHotels);
  const [searched, setSearched] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | number | boolean = value;
    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (name === "guests") {
      newValue = Number(value);
    }
    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResults(dummyHotels.filter(h => !form.city || h.city === form.city));
    setSearched(true);
  };

  return (
  <div className="min-h-screen bg-background flex flex-col items-center justify-start py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Book Hotels</h1>
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          {['hotels', 'hostels', 'resorts'].map((t) => (
            <button
              key={t}
              type="button"
              className={`px-6 py-2 font-semibold rounded-t-lg focus:outline-none transition-all duration-150 mr-2 ${tab === t ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}
              onClick={() => setTab(t as typeof tab)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        {/* Search Bar */}
        <form className="space-y-4" onSubmit={handleSearch}>
          <div>
            <label className="block mb-1 font-bold text-gray-800">City/Area</label>
            <select name="city" value={form.city} onChange={handleChange} className="w-full rounded-lg border px-3 py-2 font-bold text-gray-900 bg-blue-50">
              <option value="" disabled>Select city/area</option>
              {hotelOptions.map((a) => (
                <option key={a.city} value={a.city} className="font-bold">
                  {a.city} <span className="font-light">- {a.area}</span>
                </option>
              ))}
            </select>
            <div className="text-xs text-gray-500 font-light mt-1">
              {form.city && hotelOptions.find(a => a.city === form.city)?.area}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-bold text-gray-800">Check-in</label>
              <input type="date" name="checkin" value={form.checkin} onChange={handleChange} className="w-full rounded-lg border px-3 py-2 bg-blue-50" required />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-bold text-gray-800">Check-out</label>
              <input type="date" name="checkout" value={form.checkout} onChange={handleChange} className="w-full rounded-lg border px-3 py-2 bg-blue-50" required />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-bold text-gray-800">Guests</label>
              <input type="number" name="guests" min={1} value={form.guests} onChange={handleChange} className="w-full rounded-lg border px-3 py-2 bg-blue-50" required />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-bold text-gray-800">Room Type</label>
              <select name="roomType" value={form.roomType} onChange={handleChange} className="w-full rounded-lg border px-3 py-2 bg-blue-50 font-bold">
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-800">Special Fares</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2"><input type="checkbox" name="defence" checked={form.defence} onChange={handleChange} /> Defence Forces</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="student" checked={form.student} onChange={handleChange} /> Students</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="senior" checked={form.senior} onChange={handleChange} /> Senior Citizens</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="doctor" checked={form.doctor} onChange={handleChange} /> Doctors/Nurses</label>
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 font-bold text-orange-600"><input type="checkbox" name="hotelOffer" checked={form.hotelOffer} onChange={handleChange} /> Book Hotel & Get up to 45% OFF</label>
          </div>
          <div className="flex justify-center mt-4">
            <button type="submit" className="px-10 py-3 rounded-lg font-bold text-lg bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition">SEARCH</button>
          </div>
        </form>
        {/* Results */}
        {searched && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Available Hotels</h2>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {results.map((hotel, idx) => {
                  // Random images for demo
                  const images = [
                    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1504347538039-1e4ae3b7d8a7?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80"
                  ];
                  const imgUrl = images[idx % images.length];
                  return (
                    <div key={idx} className="border rounded-lg bg-white shadow flex flex-col">
                      <img src={imgUrl} alt={hotel.name} className="w-full h-40 object-cover rounded-t-lg mb-2" />
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-lg text-blue-800">{hotel.name}</div>
                          <div className="font-bold">{hotel.city} <span className="font-light">-</span> {hotel.area}</div>
                        </div>
                        <div className="text-orange-600 font-bold text-xl mt-2">{hotel.price}</div>
                        <div className="flex gap-2 mt-4">
                          <button className="px-4 py-2 rounded bg-primary text-white font-bold" onClick={() => alert(`View details for ${hotel.name}`)}>View Details</button>
                          <button className="px-4 py-2 rounded bg-orange-500 text-white font-bold" onClick={() => alert(`Book ${hotel.name}`)}>Book</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>No hotels found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
