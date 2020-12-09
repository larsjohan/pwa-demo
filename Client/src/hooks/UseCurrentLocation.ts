import {useEffect, useState} from 'react';

export const useCurrentLocation = (): GeolocationPosition | null => {
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    const options: PositionOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
    };

    const id = navigator.geolocation.watchPosition(pos => {
      setCurrentLocation(pos);
    }, err => {
      console.error(err);
      setCurrentLocation(null);
    }, options);

    return () => {
      navigator.geolocation.clearWatch(id);
    }

  }, []);

  return currentLocation;
};

export default useCurrentLocation;