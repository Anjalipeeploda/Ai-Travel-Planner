import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, getPhotoURL } from '@/service/globalApi';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [image, setImage] = useState('/placeholder.jpg');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await GetPlaceDetails({ textQuery: place.place || place.place_name });
        const photoRef = res.data?.places?.[0]?.photos?.[0]?.name;
        setImage(photoRef ? getPhotoURL(photoRef) : place.image_url || '/placeholder.jpg');
      } catch {
        setImage(place.image_url || '/placeholder.jpg');
      }
    };
    fetchImage();
  }, [place]);

  return (

    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.place}`}
      target="_blank"
      className="block group no-underline text-inherit"
    >
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden h-full flex flex-col shadow-xs hover:shadow-md transition-all duration-300 hover:border-gray-200">
        <img
          src={image}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={place.place}
          onError={(e) => e.target.src = '/placeholder.jpg'}
        />
        <div className="p-3 flex-grow flex flex-col">

          <h3 className="font-medium text-[15px] leading-tight text-gray-800 line-clamp-2">
            {place.place || place.place_name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1 flex items-start">
            <span className="mr-1">🏛️</span>
            {place.institute || place.details}
          </p>
        </div>
        <div className="mt-auto flex justify-between items-center pt-2">
          <span className="text-xs font-medium text-blue-600 flex items-center">
            <span className="mr-1">⏱️</span>
            {place.travel_time || 'Flexible'}
          </span>

        </div>
      </div>
    </Link>

  );
}

export default PlaceCardItem;