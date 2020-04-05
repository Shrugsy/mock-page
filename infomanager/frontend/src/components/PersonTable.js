import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import PersonTableRow from "./PersonTableRow";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { getPeople } from "../actions/people";

export default function PersonTable() {
  const [column, setColumn] = useState(null);
  const [sortablePeople, setSortablePeople] = useState([]);
  const [direction, setDirection] = useState(null);

  const people = useSelector((state) => state.people);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPeople());
  }, []);

  useEffect(() => {
    setSortablePeople(people);
    return () => {
      setSortablePeople([]);
    };
  }, [people]);

  const handleSort = (clickedColumn) => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setSortablePeople(_.sortBy(sortablePeople, [clickedColumn]));
      setDirection("ascending");
      return;
    }
    setSortablePeople(sortablePeople.reverse());
    setDirection(direction === "ascending" ? "descending" : "ascending");
  };

  return (
    <Table striped unstackable sortable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === "firstName" ? direction : null}
            onClick={handleSort("firstName")}
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "age" ? direction : null}
            onClick={handleSort("age")}
          >
            Age
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "email" ? direction : null}
            onClick={handleSort("email")}
          >
            E-mail
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "income" ? direction : null}
            onClick={handleSort("income")}
          >
            Income
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortablePeople.map(({ id, firstname, lastname, email, age, income }) => (
          <PersonTableRow
            key={id}
            firstname={firstname}
            lastname={lastname}
            email={email}
            age={age}
            income={income}
          />
        ))}
      </Table.Body>
    </Table>
  );
}
