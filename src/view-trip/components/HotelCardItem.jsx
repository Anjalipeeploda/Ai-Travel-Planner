import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, getPhotoURL } from '@/service/globalApi';

function HotelCardItem({ hotel }) {
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await GetPlaceDetails({ textQuery: `${hotel.hotel_name}, ${hotel.address}` });
        setImageUrl(
          res?.data?.places?.[0]?.photos?.[0]?.name
            ? getPhotoURL(res.data.places[0].photos[0].name)
            : hotel.image_url || imageUrl
        );
      } catch {
        setImageUrl(hotel.image_url || imageUrl);
      }
    };
    fetchImage();
  }, [hotel]);

  return (
    <div className="mb-6">
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${hotel.hotel_name},${hotel.address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block group no-underline text-inherit"
      >
        <div className="flex flex-col md:flex-row gap-4 bg-white border border-gray-100 bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden min-h-[180px]">
          
          {/* Image */}
          
            <img
              src={imageUrl}
              className="h-40 w-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none  transition-transform duration-500 hover:scale-105"
              alt={hotel.hotel_name}
              onError={(e) => (e.target.src = '/placeholder.jpg')}
            />

          {/* Content */}
          <div className="p-4 flex flex-col justify-center md:w-2/3 w-full">
            <h2 className="font-semibold text-lg text-gray-800">{hotel.hotel_name}</h2>
            <p className="text-sm text-gray-500 mt-1 truncate">📍 {hotel.address}</p>

            <div className="flex items-center gap-4 mt-3">
              <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                💰 {hotel?.price || 'N/A'}
              </span>
              <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                ⭐ {hotel?.rating || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default HotelCardItem;
