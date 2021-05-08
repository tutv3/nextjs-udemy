import { transformObjectToArray } from "./formatter";

export async function getAllEvents() {
  const res = await fetch(
    "https://nextjs-learning-e582d-default-rtdb.firebaseio.com/events.json"
  );
  const data = await res.json();
  return transformObjectToArray(data || {});
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(year, month) {
  const allEvents = await getAllEvents();
  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((evt) => evt.id === id) || null;
}
