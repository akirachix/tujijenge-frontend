import React, { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  parseISO,
} from "date-fns";
import "./styles.css";
import Sidebar from "../../SharedComponents/Sidebar";
import { useEvents } from "../../context/useEvents";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TrainingCalendar = () => {
 
  const {
    events: trainingSessions,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useEvents();

 
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSession, setEditSession] = useState(null); 
  const today = new Date();

 

  const renderHeader = () => {
    const currentYear = currentMonth.getFullYear();
    const yearRange = 10;
    const years = Array.from(
      { length: yearRange * 2 + 1 },
      (_, i) => currentYear - yearRange + i
    );

    const handleMonthChange = (e) => {
      const [year, monthIndex] = e.target.value.split("-");
      setCurrentMonth(new Date(parseInt(year), parseInt(monthIndex), 1));
    };

    const handlePrevMonth = () => {
      setCurrentMonth(addMonths(currentMonth, -1));
    };

    const handleNextMonth = () => {
      setCurrentMonth(addMonths(currentMonth, 1));
    };

    const currentYearValue = currentMonth.getFullYear();
    const currentMonthIndex = currentMonth.getMonth();

    return (
      <>
        {/* <Sidebar /> */}
        <div className="calendar-header">
          <h1>Training sessions schedules</h1>
          <div className="header-controls">
            <button onClick={handlePrevMonth} className="nav-button">
              &lt;
            </button>

            <select
              value={`${currentYearValue}-${currentMonthIndex}`}
              onChange={handleMonthChange}
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
            <button onClick={handleNextMonth} className="nav-button">
              &gt;
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderDays = () => {
    const daysArr = [];
    const dateFormat = "EEE";
    const startDateOfWeek = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      daysArr.push(
        <div className="calendar-day-name" key={i}>
          {format(addDays(startDateOfWeek, i), dateFormat)}
        </div>
      );
    }
    return <div className="calendar-days">{daysArr}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const rows = [];
    let days = [];
    let day = startDate;

    const handleDateClick = (clickedDay, trainingOnDay) => {
      setSelectedDate(clickedDay); 
      if (trainingOnDay) {
        openEditModal(trainingOnDay);
      } else {
        setEditSession(null); 
        setIsModalOpen(true);
      }
    };

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDayForCell = new Date(day);

        const currentSessionsToSearch = Array.isArray(trainingSessions) ? trainingSessions : [];
        const training =  currentSessionsToSearch.find((session) =>
          isSameDay(parseISO(session.date), currentDayForCell)
        );

        const isCurrentCalendarDay = isSameDay(currentDayForCell, today);
        days.push(
          <div
            className={`calendar-cell ${
              !isSameMonth(currentDayForCell, monthStart) ? "disabled" : ""
            } ${training ? "has-training" : ""} ${
              isCurrentCalendarDay ? "current-day" : ""
            }`}
            key={currentDayForCell.toISOString()} 
            onClick={() => handleDateClick(currentDayForCell, training)}
          >
            <span>{format(currentDayForCell, "dd")}</span>
            {training && <div className="training-type">{training.title}</div>}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div
          className="calendar-row"
          key={`row-${format(
            days[0]?.key ? parseISO(days[0].key.substring(0, 23) + "Z") : day, 
            "yyyy-MM-dd-HH-mm-ss"
          )}`}
        >
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };


  const handleAddOrUpdateSession = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const dateStr = format(selectedDate, "yyyy-MM-dd");

    if (editSession) {
      updateEvent(editSession.id, { title, date: dateStr });
    } else {
      addEvent({ title, date: dateStr });
    }
    setIsModalOpen(false);
    setEditSession(null);
  };

  const handleDeleteSession = () => {
    if (editSession) {
      deleteEvent(editSession.id);
      setIsModalOpen(false);
      setEditSession(null);
    }
  };

  const openEditModal = (session) => {
    setEditSession(session);
   
    setSelectedDate(parseISO(session.date));
    setIsModalOpen(true);
  };

  return (
    <div className="big-calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {isModalOpen && selectedDate && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              {editSession ? "Edit Training Session" : "Add Training Session"}
            </h3>
            <form onSubmit={handleAddOrUpdateSession}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  defaultValue={editSession?.title || ""}
                  required
                />
              </label>
              <label>
                Date:{" "}
                {selectedDate ? format(selectedDate, "MMMM dd, yyyy") : ""}
              </label>
              <button type="submit">{editSession ? "Update" : "Add"}</button>
              {editSession && (
                <button
                  type="button"
                  onClick={handleDeleteSession}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditSession(null);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCalendar;
