import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authenticatedFetch, BASE_URL, getAuthToken } from '../utils/api';
const EventsContext = createContext({});
export const useEvents = () => useContext(EventsContext);
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchEvents = useCallback(async () => {
    if (!BASE_URL) {
      console.warn("BASE_URL not set. Skipping fetch.");
      return;
    }
    const token = getAuthToken();
    if (!token) {
      setError("Authentication required to fetch events.");
      setEvents([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await authenticatedFetch(`${BASE_URL}training_sessions/`);
      if (response.status === 401) {
        setError("Session expired or token invalid. Please re-authenticate.");
        setEvents([]);
        return;
      }
      if (!response.ok) {
        let errorDetail = 'Failed to fetch events';
        try {
          const errorData = await response.json();
          errorDetail = errorData.detail || errorData.message || JSON.stringify(errorData);
        } catch (e) {}
        throw new Error(`${errorDetail} (Status: ${response.status})`);
      }
      const data = await response.json();
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
      setError(err.message || "An error occurred fetching events.");
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  const addEvent = async (newEventData) => {
    if (!BASE_URL) return null;
    const token = getAuthToken();
    if (!token) {
      setError("Authentication required to add events.");
      return null;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await authenticatedFetch(`${BASE_URL}training_sessions/`, {
        method: 'POST',
        body: JSON.stringify(newEventData),
      });
      if (response.status === 401) {
        setError("Session expired or token invalid. Please re-authenticate.");
        return null;
      }
      if (!response.ok) {
        let message = 'Failed to add event';
        try {
          const errJson = await response.json();
          message = errJson.detail || errJson.message || JSON.stringify(errJson);
        } catch {}
        throw new Error(message);
      }
      const createdEventFromAPI = await response.json();
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
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const updateEvent = async (eventId, updatedEventData) => {
    if (!BASE_URL) return null;
    const token = getAuthToken();
    if (!token) {
      setError("Authentication required to update events.");
      return null;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await authenticatedFetch(`${BASE_URL}training_sessions/${eventId}/`, {
        method: 'PUT',
        body: JSON.stringify(updatedEventData),
      });
      if (response.status === 401) {
        setError("Session expired or token invalid. Please re-authenticate.");
        return null;
      }
      if (!response.ok) {
        let message = 'Failed to update event';
        try {
          const errJson = await response.json();
          message = errJson.detail || errJson.message || JSON.stringify(errJson);
        } catch {}
        throw new Error(message);
      }
      const updatedEventFromAPI = await response.json();
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
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const deleteEvent = async (eventId) => {
    if (!BASE_URL) return false;
    const token = getAuthToken();
    if (!token) {
      setError("Authentication required to delete events.");
      return false;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await authenticatedFetch(`${BASE_URL}training_sessions/${eventId}/`, {
        method: 'DELETE',
      });
      if (response.status === 401) {
        setError("Session expired or token invalid. Please re-authenticate.");
        return false;
      }
      if (!response.ok && response.status !== 204) {
        let message = 'Failed to delete event';
        try {
          const errJson = await response.json();
          message = errJson.detail || errJson.message || JSON.stringify(errJson);
        } catch {}
        throw new Error(message);
      }
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      return true;
    } catch (err) {
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
    clearError: () => setError(null),
  };
  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};