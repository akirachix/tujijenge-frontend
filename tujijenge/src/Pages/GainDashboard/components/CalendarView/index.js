import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css';

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());
 

const events = [{
    title: 'Health',
    date: new Date('2025-07-01T10:00:00'),
    }, {
      title: 'Nutrition',
      date: new Date('2025-07-15T14:00:00'),
      }];


const tileContent = ({ date, view }) => {
  if (view === 'month') {
    const dayEvent = events.filter(
      (event) =>
        event.date.getFullYear() === date.getFullYear() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getDate() === date.getDate()
    );
    return (
      <>
      {dayEvent.map((events, i) =>
      (
        <div key={i} className='event-box'>
          {events.title}
        </div>
      )
      )}
      </>
    )
    
    
}
}
  return (
    <div>
     
      <Calendar className='calendar'
       onChange={setDate} 
       value={date} 
       tileContent={tileContent}/>
     
    </div>
  );
}
