import { useEffect,useState } from "react";
import { fetchTrainingSessions } from "../utils/fetchTrainingSessions";
export const useFetchTrainingSessions = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const trainingSessionsData = async () => {
      try {
          setLoading(true);
          setError(null); 
          const response = await fetchTrainingSessions();

          
          
          if (response && Array.isArray(response.results)) {
              setCurrentItems(response.results);

          } else if (Array.isArray(response)) {
              setCurrentItems(response); 

          } else {
              console.warn('HOOK: Response from fetchTrainingSessions() is not in the expected format. It might be empty or structured differently.');
              setCurrentItems([]); 
          }

      } catch (error) {

          setError(error.message ?? "An error occurred fetching training sessions");
          setCurrentItems([]); 
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      trainingSessionsData(); 
  }, []); 

  return { loading, error, currentItems };
};
