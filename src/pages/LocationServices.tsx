import { useState } from 'react';

const GEOAPIFY_API_KEY = "3477f3e5ca2c473994faa10edadf8f5f";

export default function LocationServices() {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(coords);
        fetchNearbyPlaces(coords);
      },
      (err) => setError('Unable to retrieve your location.')
    );
  };

  const fetchNearbyPlaces = async ({ lat, lon }) => {
    setLoading(true);
    setError('');
    setPlaces([]);
    try {
      // Example: fetch tailors, salons, boutiques, stylists (category: "commercial.services")
      const categories = [
        'commercial.tailor',
        'commercial.hairdresser',
        'commercial.beauty_salon',
        'commercial.boutique',
        'commercial.stylist'
      ];
      const url = `https://api.geoapify.com/v2/places?categories=${categories.join(',')}&filter=circle:${lon},${lat},2000&limit=20&apiKey=${GEOAPIFY_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setPlaces(data.features || []);
    } catch (e) {
      setError('Failed to fetch nearby places.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Find Nearby Services</h1>
      <button onClick={handleGetLocation} className="bg-luxe-purple text-white px-4 py-2 rounded">Get My Location &amp; Nearby Services</button>
      {location && (
        <div className="mt-4 text-gray-700">
          Your location: {location.lat}, {location.lon}
        </div>
      )}
      {loading && <div className="mt-4 text-gray-700">Loading nearby places...</div>}
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {places.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Nearby Services:</h2>
          <ul className="space-y-2">
            {places.map((place) => (
              <li key={place.properties.place_id} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-800">{place.properties.name || place.properties.categories[0]}</div>
                <div className="text-sm text-gray-600">{place.properties.address_line1}, {place.properties.address_line2}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}