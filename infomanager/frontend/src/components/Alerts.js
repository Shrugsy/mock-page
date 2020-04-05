import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { createError } from "../actions/errors";
import { createMessage } from "../actions/messages";

export default function Alerts() {
  const error = useSelector((state) => state.error);
  const message = useSelector((state) => state.message);

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      if (error.msg) {
        if (error.msg.firstname)
          alert.error(`First Name:  ${error.msg.firstname.join()}`);
        if (error.msg.lastname)
          alert.error(`Last Name:  ${error.msg.lastname.join()}`);
        if (error.msg.email) alert.error(`Email:  ${error.msg.email.join()}`);
        if (error.msg.age) alert.error(`Age:  ${error.msg.age.join()}`);
        if (error.msg.income)
          alert.error(`Income:  ${error.msg.income.join()}`);
        if (error.msg.detail)
          alert.error(`Detail:  ${error.msg.detail}`);
        if (error.msg.non_field_errors)
          alert.error(error.msg.non_field_errors.join());
        // clear the error message
        dispatch(createError());
      }
    }

    // console.log(error.msg);
  }, [error]);

  useEffect(() => {
    if (message) {
      alert.success(message);
      //   clear the message
      dispatch(createMessage());
    }
    // console.log(message);
  }, [message]);

  return <></>;
}
