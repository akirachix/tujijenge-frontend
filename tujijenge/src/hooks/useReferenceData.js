import { useState, useEffect } from 'react';
import { authenticatedFetch } from '../utils/api';
export const useReferenceData = () => {
  const [referenceData, setReferenceData] = useState({ customers: {}, communities: {}, products: {} });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersResponse, communitiesResponse, productsResponse] = await Promise.all([
          authenticatedFetch(`${process.env.REACT_APP_BASE_URL}users/`),
          authenticatedFetch(`${process.env.REACT_APP_BASE_URL}community/`),
          authenticatedFetch(`${process.env.REACT_APP_BASE_URL}products/`),
        ]);
        const users = await usersResponse.json();
        const communities = await communitiesResponse.json();
        const products = await productsResponse.json();
        setReferenceData({
          customers: Object.fromEntries(
            users.map(u => [u.id, {
              first_name: u.first_name,
              last_name: u.last_name,
              address: u.address || 'No location'
            }])
          ),
          communities: Object.fromEntries(
            communities.map(c => [c.id, c.name])
          ),
          products: Object.fromEntries(
            products.map(p => [p.id, p.name])
          )
        });
      } catch (err) {
        setError(err.message || err.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { loading, error, referenceData };
};






