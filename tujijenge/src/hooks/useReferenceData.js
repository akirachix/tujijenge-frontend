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


       const customersMap = Object.fromEntries(
         users.map(u => [
           String(u.id),
           {
             first_name: u.first_name,
             last_name: u.last_name,
             address: u.address || 'No location',
           },
         ])
       );


       const communitiesMap = Object.fromEntries(
         communities
           .filter(c => c.community_id !== undefined && c.name !== undefined)
           .map(c => [String(c.community_id), c.name])
       );


       const productsMap = Object.fromEntries(
         products
           .filter(p => p.product_id !== undefined && p.product_name !== undefined)
           .map(p => [String(p.product_id), p.product_name])
       );


       setReferenceData({
         customers: customersMap,
         communities: communitiesMap,
         products: productsMap,
       });
       console.log('Fetched customers keys:', Object.keys(customersMap));
       console.log('Fetched communities keys:', Object.keys(communitiesMap));
       console.log('Fetched products keys:', Object.keys(productsMap));
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





