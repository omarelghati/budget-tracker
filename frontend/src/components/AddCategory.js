import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useFormStyles, useLoader, Loader } from "../utils";
import { Button, Checkbox, TextField } from "@material-ui/core";
import { useForm, useField } from "react-final-form-hooks";
import { AddCategoryAction } from "../redux/slices/api";
import { useDispatch, useSelector } from "react-redux";
import { ErrorText } from "./../utils/index";

export default function AddCategory({ handleClose }) {
  const { loading, setLoading, formError } = useLoader();
  const classes = useFormStyles();
  const dispatch = useDispatch();

  const validateCategory = ({ title }) => {
    const errors = {};
    if (!title) {
      errors.title = "title is required.";
    }

    return errors;
  };

  const onSubmit = (values) => {
    values = { ...values, isActive: values.isActive ? values.isActive : false };
    dispatch(AddCategoryAction(values));
    setLoading(true);
    // setInterval(() => {
    //   console.log("interval");
    //   const [closeModal] = useSelector((state) => [state.ui.closeModal]);
    //   if (closeModal) {
    //     console.log("clearing");
    //     clearInterval();
    //     console.log("cleared");
    //     handleClose();
    //   }
    // }, 100);
  };

  const { form, handleSubmit, submitting, submitFailed, errors } = useForm({
    onSubmit,
    validateCategory,
  });

  const title = useField("title", form);
  const isActive = useField("isActive", form);

  const buttonProps = {
    disabled: title.meta.pristine || submitting || loading || submitFailed,
    variant: "contained",
    fullWidth: true,
    color: "primary",
    className: classes.button,
    type: "submit",
  };
  const titleProps = {
    ...title.input,
    error: title.meta.error && title.meta.submitFailed,
    fullWidth: true,
    variant: "filled",
    label: "title",
    className: classes.textField,
  };
  const isActiveProps = {
    ...isActive.input,
    name: "isActive",
    className: classes.textField,
  };

  return (
    <React.Fragment>
      <Modal onHide={handleClose} show={true}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="modal-title">Add category</h4>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <TextField {...titleProps} />
              {formError && (
                <ErrorText text={formError} className={classes.typography} />
              )}
            </div>
            <div className="form-group">
              <Checkbox {...isActiveProps} />
              <label>Applies to every month</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button {...buttonProps}>
              Add
              {!formError && loading && <Loader />}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </React.Fragment>
  );
}
