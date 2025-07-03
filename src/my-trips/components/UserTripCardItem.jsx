import { getPhotoURL, GetPlaceDetails } from '@/service/globalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [heroImage, setHeroImage] = useState('/placeholder.jpg');
  const placeName = trip?.tripData?.itinerary?.[0]?.places?.[0]?.place;

  useEffect(() => {
    const fetchImage = async () => {
      if (!placeName) return;

      try {
        const response = await GetPlaceDetails({ textQuery: placeName });
        const photoReference = response.data?.places?.[0]?.photos?.[0]?.name;
        setHeroImage(
          photoReference
            ? getPhotoURL(photoReference)
            : trip?.tripData?.itinerary?.[0]?.places?.[0]?.image_url || '/placeholder.jpg'
        );
      } catch (error) {
        console.error('Failed to fetch hero image:', error);
        setHeroImage(
          trip?.tripData?.itinerary?.[0]?.places?.[0]?.image_url || '/placeholder.jpg'
        );
      }
    };
    fetchImage();
  }, [placeName, trip]);

  return (
    <Link
      to={`/view-trip/${trip?.id}`}
      className="block group no-underline text-inherit "
    >
      <div className="hover:scale-105 transition-all flex flex-col border border-gray-100 bg-white rounded-xl shadow-md overflow-hidden mb-6 ">
        <img
          src={heroImage}
          onError={(e) => (e.target.src = '/placeholder.jpg')}
          alt="trip"
          className="object-cover w-full h-[220px] rounded-t-xl"
        />

        {/* Content below */}
        <div className="p-4">
          <h2 className="font-semibold text-lg text-gray-800 mb-1">
            {trip.userSelection?.location?.label}
          </h2>
          <p className="text-sm text-gray-500">
            {trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
