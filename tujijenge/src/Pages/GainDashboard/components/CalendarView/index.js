import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css';
import { useEvents } from '../../../../context/useEvents'; // <<< 1. IMPORT useEvents
import { parseISO, isSameDay } from 'date-fns'; // <<< For easier date comparison

export default function MyCalendar() {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date()); // For the calendar's controlled date

  // VVVVVV --- 2. GET EVENTS FROM CONTEXT --- VVVVVV
  const { events: contextEvents } = useEvents(); // Alias to avoid conflict if needed, or just use 'events'
  // ^^^^^^ --- GET EVENTS FROM CONTEXT --- ^^^^^^

  // Optional: Log to see if events are being received
  // console.log('MyCalendar received events from context:', contextEvents);

  const tileContent = ({ date: calendarDate, view }) => { // 'date' here is from react-calendar
    if (view === 'month') {
      // Filter events from CONTEXT
      // Your context events have dates as 'YYYY-MM-DD' strings
      // 'calendarDate' from react-calendar is a JavaScript Date object
      const dayEventsFromContext = contextEvents.filter((event) => {
        if (!event.date) return false; // Safety check
        try {
          const eventDateObject = parseISO(event.date); // Convert context date string to Date object
          return isSameDay(eventDateObject, calendarDate); // Use date-fns for reliable comparison
        } catch (e) {
          console.error("Error parsing event date in MyCalendar:", event.date, e);
          return false;
        }
      });

      return (
        <>
          {dayEventsFromContext.map((eventItem, i) => (
            <div key={eventItem.id || i} className='event-box'> {/* Use event.id if available for a more stable key */}
              {eventItem.title}
            </div>
          ))}
        </>
      );
    }
    return null; // Return null if not in month view or no events
  };

  return (
    <div>
      <Calendar
        className='calendar'
        onChange={setCurrentDisplayDate} // Update local state for currently selected date
        value={currentDisplayDate}       // Control the selected date
        tileContent={tileContent}       // Use the function that reads from context
      />
      {/* Optional: Display current selected date if needed */}
      {/* <p>Selected Date: {currentDisplayDate.toDateString()}</p> */}
    </div>
  );
}

