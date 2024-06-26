import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './hooks';
import { CityName } from '../../types/city';
import { Offer } from '../../types/offer';
import Pin from './assets/pin.svg';
import PinActive from './assets/pin-active.svg';
import { CITIES } from '../const';
import { useAppSelector } from '../../hooks';
import { offersSelectors } from '../../store/slices/offers';

type TMapProps = {
  extraClassName?: string;
  cityName: CityName;
  points: Offer[];
};

function Map({ extraClassName, cityName, points }: TMapProps) {
  const city = CITIES.find((item) => cityName === item.name) || CITIES[0];
  const selectedPoint = useAppSelector(offersSelectors.activeId);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap({ city, mapRef });

  const defaultCustomIcon = leaflet.icon({
    iconUrl: Pin,
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: PinActive,
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  });

  useEffect(() => {
    if (map && points) {
      points?.forEach((point) => {
        leaflet
          .marker(
            {
              lat: point.location.latitude,
              lng: point.location.longitude,
            },
            {
              icon:
                point.id === selectedPoint
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [currentCustomIcon, defaultCustomIcon, map, points, selectedPoint]);

  return <section className={clsx('map', extraClassName)} ref={mapRef} />;
}

export default Map;
