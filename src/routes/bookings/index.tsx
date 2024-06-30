import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Bookings } from "~/components/Bookings";
import type { Booking } from "~/interfaces";

export const useBookings = routeLoader$(async (requestEvent) => {
    const headers = {
        "x-api-key": requestEvent.env.get('API_KEY') as string
    };

    try {
        const response = await fetch(`${requestEvent.env.get('API_URL')}`,{
            headers: new Headers(headers)
        });
        const bookings = await response.json() as Booking[];
        return bookings;
    } catch (e:any) {
        return;
    }
})

export default component$(() => {
    const bookings = useBookings();

    return (
        <div class="mt-12 mb-8 px-4 xl:px-12 w-screen">
            <div class="mb-6 flex flex-row justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-2">Bookings</h1>
                    <p>{bookings.value?.length} total</p>
                </div>
                <div class="hidden md:flex flex-row justify-between text-center">
                    <div class="mr-4">
                        <p class="text-3xl font-bold ">87</p>
                        <p>Active</p>
                    </div>
                    <div class="ml-4">
                        <p class="text-3xl font-bold">13</p>
                        <p>Cancelled</p>
                    </div>
                </div>
            </div>
            <Bookings bookings={bookings.value}/>
        </div>
    )
})