import React, { useState } from 'react';
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
  const currentYear = currentMonth.getFullYear();
  const yearRange = 10;

  const years = Array.from({ length: yearRange * 2 + 1 }, (_, i) => currentYear - yearRange + i);

  const handleSelectChange = (e) => {
    const [year, monthIndex] = e.target.value.split('-');
    onMonthChange(new Date(parseInt(year), parseInt(monthIndex), 1));
  };

  const handlePrevMonth = () => onMonthChange(addMonths(currentMonth, -1));
  const handleNextMonth = () => onMonthChange(addMonths(currentMonth, 1));

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
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const today = new Date();


  const renderDaysHeader = () => {
    const days = [];
    const dateFormat = 'EEE';
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


    while (day <= endDate) {

      for (let i = 0; i < 7; i++) {
        const cellDate = new Date(day);
  
        const event = events.find(e => e.date && isSameDay(parseISO(e.date), cellDate)); 

        const cellClasses = `calendar-cell
        ${!isSameMonth(cellDate, monthStart) ? 'disabled' : '' } 
        ${event ? 'has-training' : ''}
        ${isSameDay(cellDate, today) ? 'current-day' : ''}`;

        days.push(
          <div
            className={cellClasses} 
            key={cellDate.toISOString()}
            onClick={() => onDateClick(cellDate, event)}
          >
            <span>{format(cellDate, 'dd')}</span>
            {event && <div className="training-type">{event.title}</div>}
          </div>
        );
 
        day = addDays(day, 1);
      }
   
      rows.push(<div className="calendar-row" key={day}>{days}</div>);
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
  if (!isOpen) return null;


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(e.target.title.value);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{event ? 'Edit Training Session' : 'Add Training Session'}</h3>
   
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" defaultValue={event?.title || ''} required />
          </label>
          <label>Date: {format(selectedDate, 'MMMM dd, yyyy')}</label>
          <Button type="submit" variant="tertiary" label={event ? 'Update' : 'Add'} />
          {event && (
            <Button
              type="button"
              variant="tertiary"
              onClick={() => onDelete(event.id)}
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
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDateClick = (date, event) => {
    setSelectedDate(date);
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

 
  const handleSaveEvent = (title) => {
    const eventData = { title, date: format(selectedDate, 'yyyy-MM-dd') };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    handleCloseModal();
  };

  
  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
    handleCloseModal();
  };

  return (
    <div className="big-calendar">
      <CalendarHeader currentMonth={currentMonth} onMonthChange={setCurrentMonth} />
      <CalendarGrid currentMonth={currentMonth} events={events} onDateClick={handleDateClick} />
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