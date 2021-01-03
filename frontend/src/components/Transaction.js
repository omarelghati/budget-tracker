import React, { useEffect, useState } from "react";
import "../assets/css/category.css";
import { useSelector, useDispatch } from "react-redux";
import { GetTransactionsAction } from "../redux/slices/api";
import { Modal } from "react-bootstrap";
import { EditTransactionAction } from "./../redux/slices/api";

export default function Transaction() {
  const [showAdd, setShowAdd] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetTransactionsAction());
  }, [dispatch]);
  const [transactions, months, currency] = useSelector((state) => [
    state.api.transactions,
    state.api.months,
    state.user.user.currency,
  ]);
  const monthIds = months.map((x) => x.id);

  const [selectedTransaction, setTransaction] = useState(transactions[0] || {});
  const [selectedMonthId, setMonth] = useState(
    months[months.length - 1]?.id || undefined
  );
  const showEdit = (item) => {
    setTransaction(item);
    setShowAdd(true);
  };
  const handleClose = () => {
    setShowAdd(false);
    setTransaction({});
  };

  const handleMonthChange = (monthId) => {
    setMonth(monthId);
    dispatch(GetTransactionsAction(monthId));
    console.log(monthIds.indexOf(selectedMonthId));
  };
  const handleChange = (evt) => {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setTransaction({
      ...selectedTransaction,
      [evt.target.name]: value,
    });
  };
  const handleEdit = () => {
    dispatch(EditTransactionAction(selectedTransaction));
    setShowAdd(false);
    dispatch(GetTransactionsAction());
  };
  return (
    <React.Fragment>
      <div className="transactions-container offset-md-2 col-8">
        <h2> My transactions </h2>
        <div className="table100 ver1 m-b-110">
          <div className="table100-head">
            <table>
              <thead>
                <tr className="row100 head">
                  <th className="cell100 column1">Description</th>
                  <th className="cell100 column2">Date</th>
                  <th className="cell100 column3">Amount</th>
                  <th className="cell100 column4">Category</th>
                  <th className="cell100 column5">Actions</th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="table100-body js-pscroll">
            <table>
              <tbody>
                {transactions && transactions.length ? (
                  transactions.map((transaction, index) => {
                    return (
                      <tr key={index} className="row100 body">
                        <td className="cell100 column1">
                          {transaction.description}
                        </td>
                        <td className="cell100 column2">
                          {new Date(transaction.date).toDateString()}
                        </td>
                        <td className="cell100 column3">
                          {transaction.amount} {currency}{" "}
                          {transaction.isPaid == false && (
                            <span className="badge badge-warning">pending</span>
                          )}
                        </td>

                        <td className="cell100 column4">
                          {transaction.categoryId}
                        </td>
                        <td className="cell100 column5">
                          <button
                            type="button"
                            onClick={() => showEdit(transaction)}
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
                    <td>No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <ul className="pagination mt-3 mx-auto">
          {selectedMonthId && monthIds.indexOf(selectedMonthId) - 1 != -1 && (
            <li
              className="page-item"
              onClick={() =>
                handleMonthChange(
                  monthIds[monthIds.indexOf(selectedMonthId) - 1]
                )
              }
            >
              <a className="page-link" href="#" tabIndex="-1">
                Past
              </a>
            </li>
          )}
          {months &&
            months.map((month, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleMonthChange(month.id)}
                  className={`page-item${
                    month.id === selectedMonthId ? " active" : ""
                  }`}
                >
                  <a className="page-link" href="#">
                    {new Date(month.date).toLocaleString("default", {
                      month: "short",
                    })}
                  </a>
                </li>
              );
            })}
          {selectedMonthId &&
            monthIds.indexOf(selectedMonthId) + 1 <= monthIds.length - 1 && (
              <li
                className="page-item"
                onClick={() =>
                  handleMonthChange(
                    monthIds[monthIds.indexOf(selectedMonthId) + 1]
                  )
                }
              >
                <a className="page-link" href="#">
                  Future
                </a>
              </li>
            )}
        </ul>
      </div>

      <Modal onHide={handleClose} show={showAdd}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="modal-title">Edit Transaction</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                value={selectedTransaction.description}
                className="form-control"
                required
              />
            </div>
            <div className="row">
              <div className="form-group col-10">
                <label>Payment amount</label>
                <input
                  type="number"
                  min="0"
                  name="amount"
                  onChange={handleChange}
                  value={selectedTransaction.amount}
                  className="form-control"
                  required
                />
              </div>
              <div
                className="form-group col-2"
                style={{ verticalAlign: "center" }}
              >
                <label>{currency}</label>
              </div>
            </div>
            <div className="form-group">
              <label>Payment</label>
              <input
                type="checkbox"
                name="isPaid"
                onChange={handleChange}
                checked={selectedTransaction.isPaid}
                className="form-control"
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <input
            type="button"
            className="btn btn-default"
            data-dismiss="modal"
            value="Cancel"
            onClick={() => setShowAdd(false)}
          />
          <input
            type="submit"
            className="btn btn-success"
            onClick={handleEdit}
            value="Edit"
          />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
