import React, { useState, useEffect } from 'react';
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format,
  isSameMonth, isSameDay, addMonths, parseISO,
} from 'date-fns';
import './styles.css';
import Button from '../sharedComponents/Button';
import { useEvents } from '../context/useEvents';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December',
];

const CalendarHeader = ({ currentMonth, onMonthChange }) => {
  console.log("CalendarHeader: Rendering. Current Month:", currentMonth);
  const currentYear = currentMonth.getFullYear();
  const yearRange = 10;
  const years = Array.from({ length: yearRange * 2 + 1 }, (_, i) => currentYear - yearRange + i);

  const handleSelectChange = (e) => {
    const [year, monthIndex] = e.target.value.split('-');
    const newMonth = new Date(parseInt(year), parseInt(monthIndex), 1);
    console.log("CalendarHeader: Month changed via dropdown to:", newMonth);
    onMonthChange(newMonth);
  };

  const handlePrevMonth = () => {
    const newMonth = addMonths(currentMonth, -1);
    console.log("CalendarHeader: Previous month clicked. New month:", newMonth);
    onMonthChange(newMonth);
  };
  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    console.log("CalendarHeader: Next month clicked. New month:", newMonth);
    onMonthChange(newMonth);
  };

  return (
    <div className="calendar-header">
      <h1>Training sessions schedules</h1>
      <div className="header-controls">
        <button onClick={handlePrevMonth} className="nav-button">&lt;</button>
        <select
          value={`${currentMonth.getFullYear()}-${currentMonth.getMonth()}`}
          onChange={handleSelectChange}
          className="month-dropdown"
        >
          {years.map((year) =>
            months.map((month, index) => (
              <option key={`${year}-${index}`} value={`${year}-${index}`}>
                {`${month} ${year}`}
              </option>
            ))
          )}
        </select>
        <button onClick={handleNextMonth} className="nav-button">&gt;</button>
      </div>
    </div>
  );
};

const CalendarGrid = ({ currentMonth, events, onDateClick }) => {
  console.log("CalendarGrid: Rendering. Current Month:", currentMonth, "Events received:", events);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday as start of week
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const today = new Date();

  const renderDaysHeader = () => {
    const days = [];
    const dateFormat = 'EEE'; // e.g., 'Sun', 'Mon'
    let day = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar-day-name" key={i}>
          {format(addDays(day, i), dateFormat)}
        </div>
      );
    }
    return <div className="calendar-days">{days}</div>;
  };

  const renderCells = () => {
    const rows = [];
    let days = [];
    let day = startDate;
    let weekKey = 0;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cellDate = new Date(day);
        const eventOnDate = events.find(e => {
          if (e && e.startDate) {
            try {
              return isSameDay(parseISO(e.startDate), cellDate);
            } catch (error) {
              console.warn("CalendarGrid: Error parsing event startDate:", e.startDate, error);
              return false;
            }
          }
          return false;
        });

        const cellClasses = `calendar-cell ${!isSameMonth(cellDate, monthStart) ? 'disabled' : ''} ${eventOnDate ? 'has-training' : ''} ${isSameDay(cellDate, today) ? 'current-day' : ''}`;

        days.push(
          <div
            className={cellClasses}
            key={cellDate.toISOString()} 
            onClick={() => {
              console.log("CalendarGrid: Date clicked:", cellDate, "Event on date:", eventOnDate);
              onDateClick(cellDate, eventOnDate); 
            }}
          >
            <span>{format(cellDate, 'dd')}</span>
            {eventOnDate && (
              <>
                <div className="training-type">{eventOnDate.title}</div>
                {eventOnDate.location && <div className="training-location">{eventOnDate.location}</div>}
              </>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="calendar-row" key={`week-${weekKey++}`}>{days}</div>);
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };

  return (
    <>
      {renderDaysHeader()}
      {renderCells()}
    </>
  );
};


const EventModal = ({ isOpen, onClose, onSave, onDelete, event, selectedDate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');



  useEffect(() => {
    console.log("EventModal useEffect [event]: event prop changed.", event);
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || ''); 
      setLocation(event.location || '');     
    } else {
      setTitle('');
      setDescription('');
      setLocation('');
    }
  }, [event]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { title, description, location };
    console.log('EventModal: Submitting form data:', formData);
    onSave(formData); 
  };

  const handleDeletePress = () => {
    if (event && event.id) {
      onDelete(event.id);
    } else {
      console.warn('EventModal: Delete pressed but no event or event ID found.');
    }
  }

  return (
    <div className="modal"> 
      <div className="modal-content">
        <h3>{event ? 'Edit Training Session' : 'Add Training Session'}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="titleInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="descriptionInput"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="locationInput"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label>Date: {selectedDate ? format(new Date(selectedDate), 'MMMM dd, yyyy') : 'No date selected'}</label>
          <Button type="submit" variant="tertiary" label={event ? 'Update' : 'Add'} />
          {event && event.id && ( 
            <Button
              type="button"
              variant="tertiary" 
              onClick={handleDeletePress}
              style={{ marginLeft: '10px' }}
              label="Delete"
            />
          )}
          <Button type="button" variant="quaternary" onClick={onClose} label="Cancel" />
        </form>
      </div>
    </div>
  );
};

const TrainingCalendar = () => {
  const { events, addEvent, updateEvent, deleteEvent, isLoading, error: contextError } = useEvents();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); 


  const handleDateClick = (dateClicked, eventOnCell) => {
    console.log("TrainingCalendar: handleDateClick. Date:", dateClicked, "Event on cell:", eventOnCell);
    setSelectedDate(dateClicked);      
    setEditingEvent(eventOnCell);       
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("TrainingCalendar: handleCloseModal called.");
    setIsModalOpen(false);
    setEditingEvent(null);
    setSelectedDate(null); 
  };

  const handleSaveEvent = async (formDataFromModal) => {

    if (!selectedDate) {
      alert("Error: No date selected. Please select a date on the calendar.");
      return;
    }

    
    const eventPayload = {
      title: formDataFromModal.title,
      description: formDataFromModal.description,
      location: formDataFromModal.location,
      start_date: format(selectedDate, 'yyyy-MM-dd'), 
      
    };

    let success = false;
    let resultFromContext;

    try {
      if (editingEvent && editingEvent.id) {
        const payloadForUpdate = { ...editingEvent, ...eventPayload };
        resultFromContext = await updateEvent(editingEvent.id, payloadForUpdate);

        resultFromContext = await updateEvent(editingEvent.id, eventPayload);
      } else {
        resultFromContext = await addEvent(eventPayload);
      }

      if (resultFromContext) { 
        success = true;
      }
    } catch (e) {
        success = false;
    }



    if (success) {
      handleCloseModal();
    } else {
      alert("Failed to save event. Check the console for more details from EventsProvider.");
    }
  };

  const handleDeleteEvent = async (eventIdToDelete) => {
    if (!eventIdToDelete) {
        return;
    }
    try {
        const success = await deleteEvent(eventIdToDelete);
        if (success) {
          handleCloseModal(); 
        } else {
          alert("Failed to delete event. Check console for details from EventsProvider.");
        }
    } catch(e) {
        alert("An error occurred while trying to delete the event.");
    }
  };

  return (
    <div className="big-calendar">
      <CalendarHeader currentMonth={currentMonth} onMonthChange={setCurrentMonth} />
      <div className='calendarGridWrapper'>
      <CalendarGrid currentMonth={currentMonth} events={events || []} onDateClick={handleDateClick} />
      </div>
      {contextError && <div style={{color: 'red', padding: '10px', textAlign: 'center'}}>Context Error: {contextError}</div>}
      {isLoading && <div style={{textAlign: 'center', padding: '10px'}}>Loading events...</div>}

      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent} 
        event={editingEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default TrainingCalendar;
