import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { LuMail } from "@qwikest/icons/lucide";
import type { BookingDetails } from "~/interfaces";

// Fetch the details for a specific booking
export const useBooking = routeLoader$(async (requestEvent) => {
    // booking ID provided by URL params 
    const id = requestEvent.params.id; 
    const headers = {
        "x-api-key": requestEvent.env.get('API_KEY') as string
    };

    try {
        const response = await fetch(`${requestEvent.env.get('API_URL')}/${id}`,{
            headers: new Headers(headers)
        })
        const data = await response.json();
        if(data.message === 'Not Found') return;
        const booking = data as BookingDetails;
        return booking;
    }
    catch(e:any){
        return;
    }
})

export default component$(() => {
    const booking = useBooking().value;
    const checkInDate = new Date(booking?.checkInDate as string);
    const checkOutDate = new Date(booking?.checkOutDate as string);
    const createdDate = new Date(booking?.createdAt as string);
    const paidDate = new Date(booking?.paidInFullAt as string);
    const cancelledDate = new Date(booking?.cancelledAt as string);
    const updatedDate = new Date(booking?.updatedAt as string);
    const stayDuration = (checkOutDate.getTime() - checkInDate.getTime()) / (1000*60*60*24);
    const totalCost = ((booking?.total as number) * 0.01).toFixed(2); 
    
    return (
        <div class="mt-12 mb-8 px-6 lg:px-12 w-screen overflow-y-hidden">
            {booking ? 
                <div class="divide-y-2 space-y-4">
                    <div class="xl:w-1/2">
                        <p class="font-bold text-2xl mb-2">Booking ID: {booking.id}</p>
                        <p class={`mb-2 font-medium ${booking.cancelledAt ? "text-red-600" : "text-green-600"}`}>
                            {booking.cancelledAt ? `Cancelled on ${cancelledDate.toLocaleDateString()}` : "Active"}
                        </p>
                        <div class="flex flex-col xl:flex-row gap-y-2 xl:gap-x-4 mb-4">
                            <p>Check-in: {checkInDate.toLocaleDateString()}</p>
                            <p>Check-out: {checkOutDate.toLocaleDateString()}</p>
                            <p>Nights: {stayDuration}</p>
                            <p>Number of guests: {booking.occupancy}</p>
                        </div>
                    </div>
                    <div class="xl:w-1/2 pt-4 mb-4">
                        <p class="font-semibold mb-4">Customer ID: {booking.customer.id}</p>
                        <p>{booking.customer.firstName} {booking.customer.lastName}</p> 
                        <p><LuMail class="inline mr-1"/> {booking.customer.email}</p>
                    </div>
                    <div class="xl:w-1/2 pt-4 mb-4 flex flex-col xl:flex-row xl:justify-between gap-y-8 xl:gap-x-8">
                        <div>
                            <p class="font-semibold mb-4">Hotel</p>
                            <p class="font-medium">{booking.hotel.name} (ID: {booking.hotel.id})</p>
                            <p>{booking.room.name} (ID: {booking.room.id})</p>
                            <p class="ml-4">- Maximum Occupancy: {booking.room.maxOccupancy}</p>
                            <p class="ml-4">- Maximum Units: {booking.room.maxUnits}</p>
                        </div>
                        <div>
                            <p class="font-semibold mb-4">Payment</p>
                            <p>Total: ${totalCost}</p>
                            <p>Status: 
                                <span class={`${booking.paidInFullAt ? "text-green-600" : "text-yellow-600"}`}>
                                    {booking.paidInFullAt ? ` Paid in full on ${paidDate.toLocaleDateString()} at ${paidDate.toLocaleTimeString()}` : " Payment needed"}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="xl:w-1/2 pt-4 mb-4">
                        <p class="font-semibold mb-4">Additional Information</p>
                        <p>Created on: {createdDate.toLocaleDateString()}</p>
                        <p>Updated on: {updatedDate.toLocaleDateString()}</p>
                        <div class="mt-2">
                            <p class="italic">Notes</p>
                            <p>{booking.notes}</p>
                        </div>
                    </div>
                    <div class="pt-4 mb-4 xl:w-1/2">
                        <p class="font-semibold mb-2">More bookings for {booking.customer.firstName} {booking.customer.lastName}</p>
                        <div class="grid grid-cols-6 lg:grid-cols-12">
                            {booking.customer.bookingIds.map((id, index) => {
                                return (
                                    <div key={index} class="xl:hover:bg-gray-200 rounded-md p-2 text-center"><a href={`/bookings/${id}`}>{id}</a></div>
                                )
                            })}
                        </div>
                    </div>
                </div> 
                : 
                <div class="font-bold text-2xl mb-2">
                    <p>No booking found.</p>
                </div>
            }
        </div>
    )
})