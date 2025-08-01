import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const EventsContext = createContext({});

export const useEvents = () => useContext(EventsContext);

const LOCAL_STORAGE_KEY_CONTEXT_EVENTS = 'contextSharedEvents'; 
const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'token'; 

// const baseUrl = process.env.REACT_APP_BASE_URL;

const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
};

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

  const baseUrl = process.env.REACT_APP_BASE_URL; 


  const fetchEvents = useCallback(async () => {
    if (!baseUrl) {
      console.warn("API_BASE_URL not set. Skipping fetch.");
     
      return;
    }

    const token = getAuthToken(); 
    if (!token) {
      console.warn("No authentication token found for API. Skipping fetch events.");

      setEvents([]); 
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/training_sessions/`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Token ${token}`, 
        },
      });

      if (response.status === 401) {
        console.error("Authorization error (401) fetching events.");
        setError("Session expired or token invalid. Please re-authenticate.");
        localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY); 
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
      console.error('Error fetching events:', err);
      setError(err.message || "An error occurred fetching events.");
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]); 

  useEffect(() => {
    
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (events.length > 0 || localStorage.getItem(LOCAL_STORAGE_KEY_CONTEXT_EVENTS)) {
        localStorage.setItem(LOCAL_STORAGE_KEY_CONTEXT_EVENTS, JSON.stringify(events));
    }
  }, [events]);



  const addEvent = async (newEventData) => {
    if (!baseUrl) {  return null; }
    const token = getAuthToken(); 
    if (!token) {
      console.warn("No auth token for addEvent.");
      setError("Authentication required to add events.");
      return null;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/training_sessions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, 
        },
        body: JSON.stringify(newEventData),
      });
   
      if (response.status === 401) { setError("Session expired..."); return null;}
      if (!response.ok) {  throw new Error('Failed to add event'); }

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
      console.error('Error adding event:', err);
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };



  const updateEvent = async (eventId, updatedEventData) => {
    if (!baseUrl) { return null; }
    const token = getAuthToken(); 
    if (!token) {
      console.warn("No auth token for updateEvent.");
      setError("Authentication required to update events.");
      return null;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/training_sessions/${eventId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, 
        },
        body: JSON.stringify(updatedEventData),
      });
     
      if (response.status === 401) { setError("Session expired..."); return null;}
      if (!response.ok) { throw new Error('Failed to update event');}

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
      console.error('Error updating event:', err);
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };



  const deleteEvent = async (eventId) => {
    if (!baseUrl) { /* ... */ return false; }
    const token = getAuthToken(); 
    if (!token) {
      console.warn("No auth token for deleteEvent.");
      setError("Authentication required to delete events.");
      return false;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/training_sessions/${eventId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`, 
        },
      });

      if (response.status === 401) { setError("Session expired..."); return false;}
      if (!response.ok && response.status !== 204) { throw new Error('Failed to delete event');}

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
