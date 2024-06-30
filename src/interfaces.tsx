// A basic booking interface for a list of bookings 
export interface Booking {
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

// A specific booking interface complete with all booking details
export interface BookingDetails {
    cancelledAt: string | null;
    checkInDate: string; 
    createdAt: string; 
    checkOutDate: string;
    currencyCode: string;
    customer: Customer;
    hotel: Hotel;
    id: number;
    occupancy: number;
    notes: string | null;
    paidInFullAt: string | null;
    room: Room;
    total: number;
    updatedAt: string | null;

}

// A customer interface for customer information and associated bookings
export interface Customer {
    bookingIds: number[];
    email: string;
    firstName: string;
    id: number;
    lastName: string;
}

export interface Hotel {
    id: number;
    name: string;
}

export interface Room {
    id: number;
    maxUnits: number;
    maxOccupancy: number;
    name: string;
}