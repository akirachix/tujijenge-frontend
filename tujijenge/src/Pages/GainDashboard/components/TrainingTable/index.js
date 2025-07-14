import React from 'react';
import './styles.css'

const sessions = [
  {
    session: "Hygiene and sanitation",
    location: "Juja, Nairobi",
    community: "Community 1",
    registered: 9,
    start: "10-12-2025",
    end: "20-12-2025"
  },
  {
    session: "Hygiene and sanitation",
    location: "Juja, Nairobi",
    community: "Community 1",
    registered: 9,
    start: "10-12-2025",
    end: "20-12-2025"
  },{
    session: "Hygiene and sanitation",
    location: "Juja, Nairobi",
    community: "Community 1",
    registered: 9,
    start: "10-12-2025",
    end: "20-12-2025"
  },{
    session: "Hygiene and sanitation",
    location: "Juja, Nairobi",
    community: "Community 1",
    registered: 9,
    start: "10-12-2025",
    end: "20-12-2025"
  },{
    session: "Hygiene and sanitation",
    location: "Juja, Nairobi",
    community: "Community 1",
    registered: 9,
    start: "10-12-2025",
    end: "20-12-2025"
  }
];


export default function TrainingTable() {
  return (
    <table className="training-table">
        <div className="horizontal-line"></div>
      <thead>
        <tr>
          <th>Training Sessions</th>
          <th>Location</th>
          <th>Communities</th>
          <th>Registered</th>
          <th>starting-date</th>
          <th>ending-date</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((s, i) => (
          <tr key={i} className={i % 2 === 0 ? "even-row" : "odd-row"}>
            <td>{s.session}</td>
            <td>{s.location}</td>
            <td>{s.community}</td>
            <td>{s.registered}</td>
            <td>{s.start}</td>
            <td>{s.end}</td>
          </tr>
        ))}
      </tbody>
      <div className="horizontal-line"></div>      
    </table>
  );
}