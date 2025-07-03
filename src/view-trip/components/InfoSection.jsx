import React, { useEffect, useState } from "react";
import { GetPlaceDetails, getPhotoURL } from "@/service/globalApi";

function InfoSection({ trip }) {
  const [heroImage, setHeroImage] = useState("/placeholder.jpg");

  const rawItinerary = trip?.tripData?.itinerary;

  const itinerary = Array.isArray(rawItinerary)
    ? rawItinerary
    : Array.isArray(rawItinerary?.days)
    ? rawItinerary.days
    : [];
  const firstPlace = itinerary?.[0]?.places?.[0];
  const placeName = firstPlace?.place || firstPlace?.place_name;
  useEffect(() => {
    const fetchImage = async () => {
      if (!placeName) return;

      try {
        const res = await GetPlaceDetails({ textQuery: placeName });
        const photoRef = res.data?.places?.[0]?.photos?.[0]?.name;

        const finalImage = photoRef
          ? getPhotoURL(photoRef)
          : firstPlace?.image_url || "/placeholder.jpg";

        setHeroImage(finalImage);
      } catch (err) {
        console.error("Image fetch failed:", err);
        setHeroImage(firstPlace?.image_url || "/placeholder.jpg");
      }
    };

    fetchImage();
  }, [placeName]);

  return (
    <div className="mt-20 flex flex-col gap-[0.25rem]">
      {/* Hero Image */}
      <div className="relative h-[240px] sm:h-[300px] md:h-[340px] lg:h-[380px] w-full overflow-hidden rounded-xl">
        <img
          src={heroImage}
          alt="destination"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => (e.target.src = "/placeholder.jpg")}
        />
      </div>

      {/* Trip Info */}
      <div className="mt-4 md:mt-6 lg:mt-8 px-2 sm:px-0">
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-800">
          {trip?.userSelection?.location?.label}
        </h2>

        <div className="mt-3 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 text-sm sm:text-base">
          <div className="flex items-center bg-blue-50/80 text-blue-600 px-3 py-1.5 rounded-full">
            <span className="mr-1.5">📅</span>
            <span>{trip?.userSelection?.noOfDays} Day Trip</span>
          </div>
          <div className="flex items-center bg-green-50/80 text-green-600 px-3 py-1.5 rounded-full">
            <span className="mr-1.5">💰</span>
            <span>{trip?.userSelection?.budget || "Flexible"} Budget</span>
          </div>
          <div className="flex items-center bg-purple-50/80 text-purple-600 px-3 py-1.5 rounded-full">
            <span className="mr-1.5">👥</span>
            <span>{trip?.userSelection?.traveler} Traveler(s)</span>
          </div>
          {trip?.userSelection?.tripType && (
            <div className="flex items-center bg-amber-50/80 text-amber-600 px-3 py-1.5 rounded-full">
              <span className="mr-1.5">✈️</span>
              <span>{trip.userSelection.tripType}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
