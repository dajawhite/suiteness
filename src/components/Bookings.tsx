import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { LuCheck, LuX } from "@qwikest/icons/lucide";
import type { Booking } from "~/interfaces";

interface Props {
    bookings: Booking[] | undefined;
}

export const Bookings = component$<Props>(({bookings}) => {
    const columns = [
        {title: "Status", mobile: true},
        {title: "Hotel", mobile: true},
        {title: "Check-in", mobile: true},
        {title: "Check-out", mobile: false},
        {title: "Nights", mobile: false},
        {title: "Guests", mobile: false},
        {title: "Total", mobile: false},
        {title: "Payment", mobile: false},
    ];
    const nav = useNavigate();

    return (
        <>
            <table class="w-full">
                <thead class="border-t border-b text-gray-400">
                    <tr>
                        {columns.map((col, index) => {
                            return (
                                <th class={`py-3 
                                    ${col.title == "Payment" ? "text-right lg:w-32 pr-3" : col.title == "Status" ? "md:pl-3 text-left" : "text-left"} 
                                    font-normal 
                                    ${!col.mobile ? "hidden md:table-cell" : "table-cell"}
                                    `} 
                                    key={index}
                                >
                                    {col.title}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody class="text-gray-800">
                    {bookings?.map((booking, index) => {
                        const checkInDate = new Date(booking.checkInDate);
                        const checkOutDate = new Date(booking.checkOutDate);
                        const stayDuration = (checkOutDate.getTime() - checkInDate.getTime()) / (1000*60*60*24);
                        const totalCost = (booking.total * 0.01).toFixed(2);

                        return (
                            <tr key={index} 
                                class="cursor-pointer xl:hover:bg-gray-200" 
                                onClick$={async () => { await nav(`/bookings/${booking.id}`) }
                            }>
                                <td class={`md:pl-3 py-6 lg:py-3 ${booking.cancelled ? "text-red-600" : "text-green-600"}`}>
                                    <p class="hidden md:block">{booking.cancelled ? "Cancelled" : "Active"}</p>
                                    <div class="md:hidden">{booking.cancelled ? <LuX/> : <LuCheck/>}</div>
                                </td>
                                <td class="truncate">{booking.hotelName}</td>
                                <td>{checkInDate.toLocaleDateString()}</td>
                                <td class="hidden md:table-cell">{checkOutDate.toLocaleDateString()}</td>
                                <td class="hidden md:table-cell">{stayDuration}</td>
                                <td class="hidden md:table-cell">{booking.occupancy}</td>
                                <td class="hidden md:table-cell">{`$ ${totalCost}`}</td>
                                <td class={`pr-3 text-right hidden md:table-cell ${booking.paid ? "text-green-600" : "text-yellow-600"}`}>{booking.paid ? "Complete" : "Pending"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
})