import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

// // [
//  {
//     "cancelled": false,
//     "checkInDate": "2024-05-31",
//     "checkOutDate": "2024-06-01",
//     "currencyCode": "USD",
//     "hotelName": "Luxor",
//     "id": 7,
//     "occupancy": 1,
//     "paid": true,
//     "total": 90928
//   },...
// ]
//   cancelled     true or false, indicates if the booking has been cancelled
//   checkInDate   stay arrival
//   checkOutDate  stay departure
//   currencyCode  currency the hotel charges in 
//   hotelName     display name of the property
//   id            db id of the booking
//   occupancy     adult guests in stay
//   paid          true or false, indicates if the booking has been paid in full
//   total         cost of booking in smallest units (e.g. cents for USD)

// 1. List all the bookings. 
// 2. Format the total appropriately, it is in the lowest unit of the currency code (e.g. cents in the above data).
// 3. A booking can be cancelled, fully paid, both or neither. Indicate this status in a way that makes sense.
// 4. Include the length of the stay for each booking (e.g. 1 night in the above case)
// 5. Include a link to /bookings/<id>

interface Booking {
    cancelled: boolean;
    checkInDate: string;
    checkOutDate: string;
    currencyCode: string;
    hotelName: string;
    id: number;
    occupancy: number;
    paid: boolean;
    total: number;
}

export const useBookings = routeLoader$(async (requestEvent) => {
    try {
        const response = await fetch(`${requestEvent.env.get('API_URL')}`,{
            headers: {
                "x-api-key": requestEvent.env.get('API_KEY')
            }
        });
        const bookings = await response.json() as Booking[];
        // console.log(bookings);
        return bookings;
    } catch (error) {
        console.log(error);
    }
   
    
})

export default component$(() => {
    const bookings = useBookings();

    return(
        <>
            <p>hi</p>
        </>
    )
})