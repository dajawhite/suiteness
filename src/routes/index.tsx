import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="mt-12 mb-8 px-6 lg:px-12 w-screen">
      <h1 class="text-4xl font-bold">Admin Booking</h1>
      <div class="mt-4 underline text-sky-600">
        <a href="/bookings">See all bookings</a>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Traverse Admin Site",
  meta: [
    {
      name: "description",
      content: "Admin portal for bookings",
    },
  ],
};
