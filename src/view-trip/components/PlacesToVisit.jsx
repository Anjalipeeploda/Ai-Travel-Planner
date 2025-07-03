import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  if (!Array.isArray(itinerary)) {
    return <div>No itinerary found</div>;
  }
  console.log("Trip:", trip);
  console.log("Itinerary:", trip?.tripData?.itinerary);

  return (
    <div>
      <h2 className="font-bold text-xl">Places to Visit</h2>
      {itinerary.map((item, dayIndex) => (
        <div key={dayIndex}>
          <h2 className="font-medium text-lg ">{item.day}</h2>
          <div className="grid grid-cols-2 gap-[1rem]">
            {item.places?.map((place, placeIndex) => (
              <div key={placeIndex} className="my-2">
                <h2 className="font-medium text-sm text-orange-600">
                  {place.time || place.time_to_visit}
                </h2>
                <PlaceCardItem place={place} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
