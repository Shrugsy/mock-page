import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import PersonTableRow from "./PersonTableRow";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { getPeople } from "../actions/people";
import { formatName } from "../helpers/formatName";

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
    
    // for each firstname & lastname, capitalize them
    const formattedPeople = people.map(({ firstname, lastname, ...rest }) => {
      return { firstname: formatName(firstname), lastname: formatName(lastname), ...rest };
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
            sorted={column === "firstname" ? direction : null}
            onClick={handleSort("firstname")}
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
        {sortablePeople.map(
          ({ id, ...rest }) => (
            <PersonTableRow
              key={id}
              id={id}
              {...rest}
            />
          )
        )}
      </Table.Body>
    </Table>
  );
}
