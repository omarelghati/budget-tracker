import React, { useEffect, useState } from "react";
import "../assets/css/category.css";
import { useSelector, useDispatch } from "react-redux";
import { GetCategoriesAction } from "../redux/slices/api";
import { GetDebtsAction } from "../redux/slices/api";
import AddCategory from "../components/AddCategory";
export default function Category() {
  function addCommas(num) {
    if (num) {
      var str = num.toString().split(".");
      if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      }
      return str.join(".");
    }
  }
  const [showAddCategory, setShowAddCategory] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDebtsAction());
    dispatch(GetCategoriesAction());
  }, [dispatch]);
  const [debts, categories, currency] = useSelector((state) => [
    state.api.debts,
    state.api.categories,
    state.user.user.currency,
  ]);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="transactions-container col-lg-5">
            <h2> Categories </h2>
            <div className="table100 ver1 m-b-110">
              <div className="table100-head">
                <table>
                  <thead>
                    <tr className="row100 head">
                      <th
                        className="cell100 column0"
                        onClick={() => setShowAddCategory(true)}
                      >
                        <span>
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </span>
                      </th>
                      <th className="cell100 column1">Name</th>
                      <th className="cell100 column2">Actions</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="table100-body js-pscroll">
                <table>
                  <tbody>
                    {categories && categories.length ? (
                      categories.map((category, index) => {
                        return (
                          <tr key={index} className="row100 body">
                            <td className="cell100 column1">
                              {category.title}
                            </td>
                            <td className="cell100 column2">
                              <button
                                type="button"
                                className="btn btn-sm btn-primary"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr style={{ textAlign: "center", padding: "50px" }}>
                        <td>No categories found, add one from "+" button</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="transactions-container col-lg-7">
            <h2> My Debts</h2>
            <div className="table100 ver1 m-b-110">
              <div className="table100-head">
                <table>
                  <thead>
                    <tr className="row100 head">
                      <th className="cell100 column0">
                        <span>
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </span>
                      </th>
                      <th className="cell100 column1">Description</th>
                      <th className="cell100 column2">Initial</th>
                      <th className="cell100 column3">Remaining</th>
                      <th className="cell100 column4">Monthly</th>
                      <th className="cell100 column5">Last paid</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="table100-body js-pscroll">
                <table>
                  <tbody>
                    {debts && debts.length ? (
                      debts.map((debt, index) => {
                        return (
                          <tr key={index} className="row100 body">
                            <td className="cell100 column0"></td>
                            <td className="cell100 column1">
                              {debt.description}
                            </td>
                            <td className="cell100 column2">
                              {debt.initialAmount &&
                                addCommas(debt.initialAmount) + " " + currency}
                            </td>
                            <td className="cell100 column3">
                              {debt.remainingAmount &&
                                addCommas(debt.remainingAmount) +
                                  " " +
                                  currency}
                            </td>
                            <td className="cell100 column4">
                              {debt.monthlyAmount &&
                                addCommas(debt.monthlyAmount) + " " + currency}
                            </td>
                            <td className="cell100 column5">
                              {debt.lastPaidOn &&
                                new Date(debt.lastPaidOn).toDateString()}{" "}
                              {new Date(debt.lastPaidOn).getMonth() !=
                                new Date().getMonth() && (
                                <span className="badge badge-warning">
                                  pending
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr style={{ textAlign: "center", padding: "50px" }}>
                        <td>No data found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddCategory && (
        <AddCategory handleClose={() => setShowAddCategory(false)} />
      )}
    </React.Fragment>
  );
}
