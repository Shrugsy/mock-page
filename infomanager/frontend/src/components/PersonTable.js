import React from 'react'
import { Table } from 'semantic-ui-react'
import PersonTableRow from './PersonTableRow'

// TODO: Make sortable
export default function PersonTable() {
    return (
        <Table striped unstackable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Age</Table.HeaderCell>
                    <Table.HeaderCell>E-mail</Table.HeaderCell>
                    <Table.HeaderCell>Income</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <PersonTableRow 
                    firstName='john'
                    lastName='smith'
                    email='john@email.com'
                    age={23}
                    income={10000}
                />
            </Table.Body>
        </Table>
    )
}
