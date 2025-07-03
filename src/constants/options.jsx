export const SelectTravelesList=[
    {
    id:1,
    title:'Just Me',
    desc:'A sole traveles in exploration',
    icon:'✈️',
    people:'1'
},
 {
    id:2,
    title:'A Couple',
    desc:'Two traveles in tandem',
    icon:'🥂',
    people:'2 People'
},
{
    id:3,
    title:'Family',
    desc:'A group of fun loving adv',
    icon:'🏡',
    people:'4 People'
},
{
    id:4,
    title:'Friends',
    desc:'A bunch of thrill-seekes',
    icon:'😎',
    people:'5 to 15 people'
},
]

export const SelectBudgetOptions=[
    {
        id:'1',
        title:'Cheap',
        desc:'Stay Conscious of costs',
        icon:'💵',
    },
    {
        id:'2',
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:'3',
        title:'Luxury',
        desc:'Do not worry about cost',
        icon:'💎',
    },
]

export const AI_PROMPT = `
Generate a travel plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget.

Give me a hotels list with the following exact fields:
- hotel_name
- hotel_address
- price
- image_url
- geo_coordinates
- rating
- description

Then, suggest an itinerary for {totalDays} days. For each day, include a list of places with the following **exact** fields:
- place: name of the place
- details: description of the place
- image_url: image link
- geo_coordinates: location coordinates
- ticket_pricing
- rating
- time: best time to visit
- travel_time: time taken to reach from the previous place

Return the entire response strictly in JSON format without any explanations or extra text.
`;


