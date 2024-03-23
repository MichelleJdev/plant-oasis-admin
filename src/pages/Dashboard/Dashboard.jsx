import { useState } from "react";
import "./Dashboard.css";
import useAuth from "../../auth/hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import { Chart } from "chart.js/auto";
import {
  USERS_ENDPOINT,
  ORDERS_ENDPOINT,
  STRIPE_ENDPOINT,
  PRODUCTS_ENDPOINT,
} from "../../API/endpoints";
import UsersBarChart from "../../components/UsersBarChart/UsersBarChart";
import ContentLoadingFade from "../../components/ContentLoadingFade/ContentLoadingFade";
import formatUnitAmount from "../../utils/formatUnitAmount";

const loaderColor = "rgb(89, 128, 147)";

function Dashboard() {
  const { auth } = useAuth();

  const { data: stripeBalanceData, loading: stripeBalanceLoading } = useFetch(
    `${STRIPE_ENDPOINT}/balance`
  );
  const { data: productCountData, loading: productCountLoading } = useFetch(
    `${PRODUCTS_ENDPOINT}/count`
  );

  const { data: usersCountData, loading: usersCountLoading } = useFetch(
    `${USERS_ENDPOINT}/count`
  );

  const { data: ordersCountData, loading: ordersCountLoading } = useFetch(
    `${ORDERS_ENDPOINT}/recent`
  );

  return (
    <div className="Dashboard">
      <h2 className="greeting">
        Welcome Back{" "}
        <span className="admin-name">{auth?.admin?.firstName}</span>
      </h2>
      <div className="dashboard-grid">
        <div className="one dash-grid-item">
          <UsersBarChart />
        </div>

        <div className="two y-ctr dash-grid-item">
          <h2 className="figure">
            {usersCountLoading ? (
              <ContentLoadingFade color={loaderColor} />
            ) : (
              usersCountData
            )}
          </h2>
          <p>Registered Users</p>
        </div>

        <div className="three dash-grid-item y-ctr">
          <h2 className="figure">
            {stripeBalanceLoading ? (
              <ContentLoadingFade color={loaderColor} />
            ) : (
              formatUnitAmount(stripeBalanceData.balance.available[0].amount)
            )}
          </h2>
          <p>Total Balance</p>
        </div>
        <div className="four dash-grid-item y-ctr">
          <h2 className="figure">
            {ordersCountLoading ? (
              <ContentLoadingFade color={loaderColor} />
            ) : (
              ordersCountData
            )}
          </h2>
          <p>Orders/24h</p>
        </div>
        <div className="five dash-grid-item y-ctr">
          <h2 className="figure">
            {productCountLoading ? (
              <ContentLoadingFade color={loaderColor} />
            ) : (
              productCountData
            )}
          </h2>
          <p>Products</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
