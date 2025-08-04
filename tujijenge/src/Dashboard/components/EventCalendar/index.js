import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './styles.css'; 
import { useEvents } from '../../../context/useEvents'; 
import { parseISO, isSameDay} from 'date-fns'; 

export default function EventCalendar() {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date());

  
  const { events: eventsFromContext } = useEvents();

  const tileContent = ({ date: calendarDate, view }) => {
 
    if (view === 'month') {
      const dayEvents = eventsFromContext.filter((event) => {

        if (!event.startDate) {
        
          return false;
        }

        try {
       
          const eventDateObject = parseISO(event.startDate);


          return isSameDay(eventDateObject, calendarDate);
        } catch (e) {
          console.error(`Error parsing event startDate in EventCalendar for event ID ${event.id}:`, event.startDate, e);
          return false;
        }
      });

      if (dayEvents.length > 0) {
        return (
          <div className="events-container-for-day"> 
            {dayEvents.map((eventItem) => (
              <div key={eventItem.id} className='event-box'> 
                {eventItem.title}
              </div>
            ))}
          </div>
        );
      }
    }
    return null; 
  };


  const tileClassName = ({ date: calendarDate, view }) => {
    if (view === 'month') {
      const hasEvent = eventsFromContext.some(event => {
        if (!event.startDate) return false;
        try {
          return isSameDay(parseISO(event.startDate), calendarDate);
        } catch {
          return false;
        }
      });
      if (hasEvent) {
        return 'day-has-events'; 
      }
    }
    return null;
  };


  const handleDateClick = (clickedDate) => {
   
    console.log('Date clicked:', clickedDate);
    const eventsOnClickedDate = eventsFromContext.filter(event =>
      event.startDate && isSameDay(parseISO(event.startDate), clickedDate)
    );
    console.log('Events on this day:', eventsOnClickedDate);
  
  };

  return (
    <div className="my-calendar-container"> 
      <Calendar
        className='calendar' 
        onChange={setCurrentDisplayDate} 
        value={currentDisplayDate}      
        tileContent={tileContent}      
        tileClassName={tileClassName} 
        onClickDay={handleDateClick}   
        // onActiveStartDateChange={({ activeStartDate }) => setCurrentDisplayDate(activeStartDate)} // Alternative for month navigation
      />
    </div>
  );
}
