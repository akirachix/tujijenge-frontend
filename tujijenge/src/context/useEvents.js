import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authenticatedFetch, BASE_URL } from '../utils/api';

const EventsContext = createContext({});

export const useEvents = () => useContext(EventsContext);

const LOCAL_STORAGE_KEY_CONTEXT_EVENTS = 'contextSharedEvents';

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem(LOCAL_STORAGE_KEY_CONTEXT_EVENTS);
    if (storedEvents) {
      try {
        return JSON.parse(storedEvents);
      } catch (error) {
        console.error("Error parsing stored events from localStorage:", error);
        localStorage.removeItem(LOCAL_STORAGE_KEY_CONTEXT_EVENTS);
        return [];
      }
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    if (!BASE_URL) {
      console.warn("API_BASE_URL not set. Skipping fetch.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await authenticatedFetch(`${BASE_URL}/training_sessions/`);
      const loadedEvents = data.map(event => ({
        id: event.session_id,
        title: event.title,
        startDate: event.start_date,
        location: event.location,
        isCancelled: event.is_cancelled,
        updatedAt: event.updated_at,
      }));
      setEvents(loadedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.message || "An error occurred fetching events.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (events.length > 0 || localStorage.getItem(LOCAL_STORAGE_KEY_CONTEXT_EVENTS)) {
        localStorage.setItem(LOCAL_STORAGE_KEY_CONTEXT_EVENTS, JSON.stringify(events));
    }
  }, [events]);

  const addEvent = async (newEventData) => {
    if (!BASE_URL) {  return null; }

    setIsLoading(true);
    setError(null);
    try {
      const createdEventFromAPI = await authenticatedFetch(`${BASE_URL}/training_sessions/`, {
        method: 'POST',
        body: JSON.stringify(newEventData),
      });
      const newEvent = {
        id: createdEventFromAPI.session_id,
        title: createdEventFromAPI.title,
        startDate: createdEventFromAPI.start_date,
        location: createdEventFromAPI.location,
        isCancelled: createdEventFromAPI.is_cancelled,
        updatedAt: createdEventFromAPI.updated_at,
      };
      setEvents(prevEvents => [...prevEvents, newEvent]);
      return newEvent;
    } catch (err) {
      console.error('Error adding event:', err);
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateEvent = async (eventId, updatedEventData) => {
    if (!BASE_URL) { return null; }

    setIsLoading(true);
    setError(null);
    try {
      const updatedEventFromAPI = await authenticatedFetch(`${BASE_URL}/training_sessions/${eventId}/`, {
        method: 'PUT',
        body: JSON.stringify(updatedEventData),
      });
      const updatedEvent = {
        id: updatedEventFromAPI.session_id,
        title: updatedEventFromAPI.title,
        startDate: updatedEventFromAPI.start_date,
        location: updatedEventFromAPI.location,
        isCancelled: updatedEventFromAPI.is_cancelled,
        updatedAt: updatedEventFromAPI.updated_at,
      };
      setEvents(prevEvents =>
        prevEvents.map(event => (event.id === eventId ? updatedEvent : event))
      );
      return updatedEvent;
    } catch (err) {
      console.error('Error updating event:', err);
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async (eventId) => {
    if (!BASE_URL) { return false; }

    setIsLoading(true);
    setError(null);
    try {
      await authenticatedFetch(`${BASE_URL}/training_sessions/${eventId}/`, {
        method: 'DELETE',
      });
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      return true;
    } catch (err) {
      console.error('Error deleting event:', err);
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    events,
    isLoading,
    error,
    fetchEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    clearError: () => setError(null)
  };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};