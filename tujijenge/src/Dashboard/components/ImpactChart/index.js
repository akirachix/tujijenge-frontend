import React, { useEffect, useState } from "react";
import "./styles.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CalendarView from "../EventCalendar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

import {
  getMamaMbogaCounts,
  getCommunityStats,
  getRegistrationsForTrainedMamaMboga,
} from "../../../utils/dataUtils";

import useFetchUsers from "../../../hooks/useFetchUsers";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ImpactChart() {
  const navigate = useNavigate();

  const { users, loading: usersLoading, error: usersError } = useFetchUsers();

  const [, setCommunities] = useState([]);
  const [, setRegistrations] = useState([]);

  const [stats, setStats] = useState({
    totalCommunities: 0,
    trainedCommunities: 0,
    totalMamaMboga: 0,
    trainedMamaMboga: 0,
    totalRegistrationsForTrained: 0,
  });

  const [chartData, setChartData] = useState({
    labels: ["Trained Mama Mboga", "Untrained Mama Mboga"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#999F6C", "#084236"],
        borderColor: ["white"],
        borderWidth: 0.1,
      },
    ],
  });

  const options = {
    cutout: "80%",
    plugins: {
      legend: { display: false },
    },
  };

  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (usersLoading || usersError) return; 


    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No auth token found for API. Skipping fetch.");
      return;
    }

    Promise.all([
      Promise.resolve(users), 

      fetch(`${baseUrl}community`, {
        headers: { Authorization: `Token ${token}` },
      }).then((res) => res.json()),

      fetch(`${baseUrl}training_registration`, {
        headers: { Authorization: `Token ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([mamaMbogasData, communitiesData, registrationsData]) => {
        setCommunities(communitiesData);
        setRegistrations(registrationsData);

        const mamaMbogaCounts = getMamaMbogaCounts(mamaMbogasData);
        const communityStats = getCommunityStats(communitiesData, mamaMbogasData);
        const trainedRegistrations = getRegistrationsForTrainedMamaMboga(
          registrationsData,
          mamaMbogasData
        );

        setChartData({
          labels: ["Trained Mama Mboga", "Untrained Mama Mboga"],
          datasets: [
            {
              data: [mamaMbogaCounts.trained, mamaMbogaCounts.untrained],
              backgroundColor: ["#999F6C", "#084236"],
              borderColor: ["white"],
              borderWidth: 0.1,
            },
          ],
        });

        setStats({
          totalCommunities: communityStats.totalCommunities,
          trainedCommunities: communityStats.trainedCommunities,
          totalMamaMboga: mamaMbogaCounts.total,
          trainedMamaMboga: mamaMbogaCounts.trained,
          totalRegistrationsForTrained: trainedRegistrations.length,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [users, usersLoading, usersError, baseUrl]);

  const handleClick = () => {
    navigate("/calendar");
  };

  const trainedPercentage =
    chartData.datasets[0].data[0] > 0
      ? Math.round(
          (chartData.datasets[0].data[0] /
            (chartData.datasets[0].data[0] + chartData.datasets[0].data[1])) *
            100
        )
      : 0;

  if (usersLoading) {
    return <div>Loading users...</div>;
  }

  if (usersError) {
    return <div>Error loading users: {usersError.message}</div>;
  }

  return (
    <div className="dashboard">
      <div className="cards-and-chart">
        <div className="cards">
          <div className="card">
            <FontAwesomeIcon className="group" icon={faUserGroup} />
            <p style={{ fontWeight: 600 }}>
              Communities:
              <span style={{ fontWeight: 400 }}> {stats.totalCommunities}</span>{" "}
              <br />
              <br />
              Number of communities trained:
              <span style={{ fontWeight: 400 }}> {stats.trainedCommunities}</span>
            </p>
          </div>
          <div className="card">
            <FontAwesomeIcon className="group" icon={faUserGroup} />
            <p style={{ fontWeight: 600 }}>
              Mama Mboga:
              <span style={{ fontWeight: 400 }}> {stats.totalMamaMboga}</span>
              <br />
              <br />
              Number of mama mboga trained:
              <span style={{ fontWeight: 400 }}> {stats.trainedMamaMboga}</span>
            </p>
          </div>
        </div>

        <div className="impact-chart">
          <div className="chart-title">
            <h1>Impact</h1>
          </div>

          <div className="legend">
            {chartData.labels.map((label, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                ></span>
                <span className="legend-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="doughnut">
            <Doughnut
              key={JSON.stringify(chartData.datasets[0].data)}
              data={chartData}
              options={options}
            />
            <div className="doughnut-inner">
              <span>{trainedPercentage}%</span>
              <br />
              <span>Trained</span>
            </div>
          </div>
        </div>
        <CalendarView onClick={handleClick} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
}
