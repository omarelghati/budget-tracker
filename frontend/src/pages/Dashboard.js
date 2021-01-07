import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../assets/css/Dashboard.css";
import { useSelector } from "react-redux";

// import { Arc, ArcSeries, Tooltip, ChartProvider } from "rough-charts";
import { GetMonthlyStatisticsAction } from "./../redux/slices/api";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetMonthlyStatisticsAction());
  }, [dispatch]);
  function addCommas(num) {
    if (num) {
      var str = num.toString().split(".");
      if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      }
      return str.join(".");
    }
  }
  const [
    currency,
    remainingBalance,
    totalBalance,
    salary,
  ] = useSelector((state) => [
    state.user.user.currency,
    state.api.statistics.current.remainingBalance,
    state.user.user.totalBalance,
    state.api.salary,
  ]);
  return (
    <div>
      <div className="container pt-5">
        <div className="row align-items-stretch">
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Account Balance
                <svg
                  className="MuiSvgIcon-root-19"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </h4>
              <span className="hind-font caption-12 c-dashboardInfo__count">
                {addCommas(totalBalance)} {" " + currency}
              </span>
            </div>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Remaining balance <br />
                for this month
                <svg
                  className="MuiSvgIcon-root-19"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </h4>
              <span className="hind-font caption-12 c-dashboardInfo__count">
                {addCommas(remainingBalance)} {" " + currency}
              </span>
              <span className="hind-font caption-12 c-dashboardInfo__subInfo">
                Last month: €30
              </span>
            </div>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Available funds
                <svg
                  className="MuiSvgIcon-root-19"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </h4>
              <span className="hind-font caption-12 c-dashboardInfo__count">
                €5000
              </span>
            </div>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                You're saving
                <svg
                  className="MuiSvgIcon-root-19"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </h4>
              <span className="hind-font caption-12 c-dashboardInfo__count">
                {(remainingBalance / salary) * 100} %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
