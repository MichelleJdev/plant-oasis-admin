import { useState, useMemo } from "react";
import "./UsersBarChart.css";
import useFetch from "../../hooks/useFetch";
import { USERS_ENDPOINT } from "../../API/endpoints";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

import ContentLoadingFade from "../ContentLoadingFade/ContentLoadingFade";

const loaderColor = "rgb(89, 128, 147)";

function UsersBarChart() {
  const [userDataRecency, setUserDataRecency] = useState(7);
  const { data: usersChartData, loading: usersLoading } = useFetch(
    `${USERS_ENDPOINT}/chart-data?recency=${userDataRecency}`
  );

  const data = useMemo(() => {
    if (usersLoading) return null;
    return {
      labels: usersChartData?.labels,
      datasets: [
        {
          label: "Recent Users",
          data: usersChartData?.labels.map((label) => {
            let matchedUsers = usersChartData.users.filter((user) => {
              const userCreatedDate = new Date(user.createdAt).getDate();
              const dayOfWeek = new Date(label).getDate();
              return userCreatedDate === dayOfWeek;
            });
            return matchedUsers.length;
          }),
          backgroundColor: "rgb(45, 87, 108)",
        },
      ],
    };
  }, [usersChartData, usersLoading]);

  return (
    <div className="UsersBarChart">
      {usersLoading ? (
        <ContentLoadingFade
          text="Recent Users"
          fontSize="10px"
          color={loaderColor}
        />
      ) : (
        <Bar data={data} style={{ height: "100%", width: "100%" }} />
      )}
    </div>
  );
}

export default UsersBarChart;
