import React from "react";
import { Table, Button } from "semantic-ui-react";
import formatMoney from "../helpers/formatMoney";
import { useDispatch } from "react-redux";
import { deletePerson } from "../actions/people";

export default function PersonTableRow({
  id,
  firstname,
  lastname,
  email,
  age,
  income,
}) {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    console.log("trying to delete " + id);
    dispatch(deletePerson(id));
  };

  // TODO: Show a delete button within first cell on hover
  // should dispatch a delete event
  return (
    <Table.Row>
      <Table.Cell>
        <Button onClick={() => handleDelete(id)}>X</Button>
        {firstname} {lastname}
      </Table.Cell>
      <Table.Cell>{age}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>{formatMoney(income)}</Table.Cell>
    </Table.Row>
  );
}
