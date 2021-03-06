import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import PersonTableRow from "./PersonTableRow";
import _ from "lodash";
import { useSelector } from "react-redux";
import formatName from "../helpers/formatName";
import { peopleSelector } from "../selectors";

export default function PersonTable() {
  const [column, setColumn] = useState(null);
  const [sortablePeople, setSortablePeople] = useState([]);
  const [direction, setDirection] = useState(null);

  // get people from state
  const people = useSelector((state) => peopleSelector(state));

  useEffect(() => {
    // for each firstname & lastname, capitalize them
    const formattedPeople = people.map(({ firstname, lastname, ...rest }) => {
      return {
        firstname: formatName(firstname),
        lastname: formatName(lastname),
        ...rest,
      };
    });
    setSortablePeople(formattedPeople);
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
            id="name-header"
            sorted={column === "firstname" ? direction : null}
            onClick={handleSort("firstname")}
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            id="age-header"
            sorted={column === "age" ? direction : null}
            onClick={handleSort("age")}
          >
            Age
          </Table.HeaderCell>
          <Table.HeaderCell
            id="email-header"
            sorted={column === "email" ? direction : null}
            onClick={handleSort("email")}
          >
            E-mail
          </Table.HeaderCell>
          <Table.HeaderCell
            id="income-header"
            sorted={column === "income" ? direction : null}
            onClick={handleSort("income")}
          >
            Income
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortablePeople.map(({ id, ...rest }) => (
          <PersonTableRow key={id} id={id} {...rest} />
        ))}
      </Table.Body>
    </Table>
  );
}
