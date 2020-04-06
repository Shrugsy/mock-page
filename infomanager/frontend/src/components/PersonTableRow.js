import React, { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import formatMoney from "../helpers/formatMoney";
import { useDispatch } from "react-redux";
import { deletePerson } from "../actions/people";
import PropTypes from "prop-types";

export default function PersonTableRow({
  id,
  firstname,
  lastname,
  email,
  age,
  income,
}) {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deletePerson(id));
  };

  // TODO: Show a delete button within first cell on hover
  // should dispatch a delete event
  return (
    <Table.Row
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Table.Cell>
        {show && (
          <Button
            negative
            circular
            icon="delete"
            size="mini"
            compact
            onClick={() => handleDelete(id)}
          />
        )}
        {firstname} {lastname}
      </Table.Cell>
      <Table.Cell>{age}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>{formatMoney(income)}</Table.Cell>
    </Table.Row>
  );
}

PersonTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
};
