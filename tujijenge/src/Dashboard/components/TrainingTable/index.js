import React, { useState } from 'react';
import './styles.css'; 
import { useFetchTrainingSessions } from "../../../hooks/useFetchTrainingSessions";



const TrainingTable = () => {

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(5); 

const{loading,error, currentItems} = useFetchTrainingSessions ();
  if  (loading){
    return <h1>Loading...</h1>;
  }
  if  (error){
    return <h1>{error}</h1> ;
  }
  



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const Items = (currentItems?? []).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((currentItems?.length || 0) / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>


      <table className="training-table">
    
        <thead>
          <tr>
            <th>Training Sessions</th>
            <th>Location</th>
            <th>Description</th>
            <th>Registered</th>
            <th>Starting-date</th>
            <th>Ending-date</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
         
          {Items.map((item, index) => (
            <tr key={item.id || index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>{`${item.title}`}</td>
              <td>{`${item.location}`}</td>
              <td>{`${item.description}`}</td>
              <td>{`${item.registered}`}</td>
              <td>{`${item.start_date}`}</td>
              <td>{`${item.end_date}`}</td>
              <td>{`${item.updated_at}`}</td>
            </tr>
          ))}
        </tbody>
   
      </table>

      {totalPages > 1 && ( 
        <nav>
          <ul className="pagination-list"> 
            {currentPage > 1 && (
              <li>
                <button className="pagination-button" onClick={() => paginate(currentPage - 1)}>
                  &lt; Prev
                </button>
              </li>
            )}

            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1}>
                <button
                  className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            {currentPage < totalPages && (
              <li>
                <button className="pagination-button" onClick={() => paginate(currentPage + 1)}>
                  Next &gt;
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default TrainingTable;
