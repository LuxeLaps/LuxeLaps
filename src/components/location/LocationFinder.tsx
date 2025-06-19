import { useState } from 'react';

export function LocationFinder({ onLocation }) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(coords);
        onLocation && onLocation(coords);
      },
      (err) => setError('Unable to retrieve your location.')
    );
  };

  return (
    <div>
      <button onClick={handleGetLocation} className="bg-luxe-purple text-white px-4 py-2 rounded">Get My Location</button>
      {location && (
        <div className="mt-2 text-gray-700">
          Your location: {location.lat}, {location.lng}
        </div>
      )}
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </div>
  );
}