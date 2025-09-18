import React, { useState, ChangeEvent, FormEvent } from "react";

type Flight = {
  airline: string;
  from: string;
  to: string;
  date: string;
  passengers: number;
  price: string;
};

const dummyFlights: Flight[] = [
  {
    airline: "IndiGo",
    from: "Delhi",
    to: "Mumbai",
    date: "2025-09-20",
    passengers: 2,
    price: "₹5,200"
  },
  {
    airline: "Air India",
    from: "Bangalore",
    to: "Goa",
    date: "2025-09-22",
    passengers: 1,
    price: "₹4,800"
  },
  {
    airline: "SpiceJet",
    from: "Kolkata",
    to: "Chennai",
    date: "2025-09-25",
    passengers: 3,
    price: "₹7,500"
  }
];

export default function FlightsPage() {
  const [tab, setTab] = useState<'oneway' | 'roundtrip' | 'multicity'>('oneway');
  const [form, setForm] = useState({
    from: "",
    to: "",
    departure: "",
    returnDate: "",
    passengers: 1,
    travelClass: "Economy",
    defence: false,
    student: false,
    senior: false,
    doctor: false,
    hotelOffer: false
  });
  const [results, setResults] = useState<Flight[]>([]);
  const [searched, setSearched] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | number | boolean = value;
    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (name === "passengers") {
      newValue = Number(value);
    }
    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResults(dummyFlights);
    setSearched(true);
  };

  // Example city/airport data
  const airports = [
    { city: "Delhi", airport: "Indira Gandhi Intl", code: "DEL" },
    { city: "Mumbai", airport: "Chhatrapati Shivaji Intl", code: "BOM" },
    { city: "Bangalore", airport: "Kempegowda Intl", code: "BLR" },
    { city: "Goa", airport: "Dabolim Airport", code: "GOI" },
    { city: "Kolkata", airport: "Netaji Subhas Chandra Bose Intl", code: "CCU" },
    { city: "Chennai", airport: "Chennai Intl", code: "MAA" }
  ];

  return (
  <div className="min-h-screen bg-background flex flex-col items-center justify-start py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Book Flights</h1>
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          {['oneway', 'roundtrip', 'multicity'].map((t) => (
            <button
              key={t}
              type="button"
              className={`px-6 py-2 font-semibold rounded-t-lg focus:outline-none transition-all duration-150 mr-2 ${tab === t ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}
              onClick={() => setTab(t as typeof tab)}
            >
              {t === 'oneway' ? 'One Way' : t === 'roundtrip' ? 'Round Trip' : 'Multicity'}
            </button>
          ))}
        </div>
        {/* Search Bar */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSearch}>
          {/* From Dropdown */}
          <div>
            <label className="block mb-1 font-bold text-gray-800">From</label>
            <select name="from" value={form.from} onChange={handleChange} className="w-full rounded-lg border px-3 py-2 font-bold text-gray-900 bg-blue-50">
              <option value="" disabled>Select city/airport</option>
              {airports.map((a) => (
                <option key={a.code} value={a.city} className="font-bold">
                  {a.city} <span className="font-light">- {a.airport} ({a.code})</span>
                </option>
              ))}
            </select>
            <div className="text-xs text-gray-500 font-light mt-1">
              {form.from && airports.find(a => a.city === form.from)?.airport} ({form.from && airports.find(a => a.city === form.from)?.code})
            </div>
          </div>
          {/* To Dropdown */}
          <div>
            <label className="block mb-1 font-bold text-gray-800">To</label>
            <select name="to" value={form.to} onChange={handleChange} className="w-full rounded-lg border px-3 py-2 font-bold text-gray-900 bg-blue-50">
              <option value="" disabled>Select city/airport</option>
              {airports.map((a) => (
                <option key={a.code} value={a.city} className="font-bold">
                  {a.city} <span className="font-light">- {a.airport} ({a.code})</span>
                </option>
              ))}
            </select>
            <div className="text-xs text-gray-500 font-light mt-1">
              {form.to && airports.find(a => a.city === form.to)?.airport} ({form.to && airports.find(a => a.city === form.to)?.code})
            </div>
          </div>
          {/* Departure Date */}
          <div>
            <label className="block mb-1 font-bold text-gray-800">Departure</label>
            <input type="date" name="departure" value={form.departure} onChange={handleChange} className="w-full rounded-lg border px-3 py-2 bg-blue-50" required />
          </div>
          {/* Return Date (only for roundtrip) */}
          {tab === 'roundtrip' && (
            <div>
              <label className="block mb-1 font-bold text-gray-800">Return</label>
              <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} className="w-full rounded-lg border px-3 py-2 bg-blue-50" required />
            </div>
          )}
          {/* Travellers & Class */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-bold text-gray-800">Travellers & Class</label>
            <div className="flex gap-2">
              <input type="number" name="passengers" min={1} value={form.passengers} onChange={handleChange} className="rounded-lg border px-3 py-2 w-24 bg-blue-50" required />
              <select name="travelClass" value={form.travelClass} onChange={handleChange} className="rounded-lg border px-3 py-2 bg-blue-50 font-bold">
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>
          </div>
          {/* Special Fares */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-bold text-gray-800">Special Fares</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2"><input type="checkbox" name="defence" checked={form.defence} onChange={handleChange} /> Defence Forces</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="student" checked={form.student} onChange={handleChange} /> Students</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="senior" checked={form.senior} onChange={handleChange} /> Senior Citizens</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="doctor" checked={form.doctor} onChange={handleChange} /> Doctors/Nurses</label>
            </div>
          </div>
          {/* Hotel Offer */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 font-bold text-orange-600"><input type="checkbox" name="hotelOffer" checked={form.hotelOffer} onChange={handleChange} /> Book Hotel & Get up to 45% OFF</label>
          </div>
          {/* Search Button */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button type="submit" className="px-10 py-3 rounded-lg font-bold text-lg bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition">SEARCH</button>
          </div>
        </form>
        {/* Results */}
        {searched && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Available Flights</h2>
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((flight, idx) => (
                  <div key={idx} className="border rounded-lg p-4 bg-white shadow flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="font-bold text-lg text-blue-800">{flight.airline}</div>
                      <div className="font-bold">{flight.from} <span className="font-light">→</span> {flight.to}</div>
                      <div className="text-sm text-gray-500">Date: {flight.date} | Passengers: {flight.passengers}</div>
                    </div>
                    <div className="text-orange-600 font-bold text-xl mt-2 md:mt-0">{flight.price}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No flights found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
