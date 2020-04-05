import React from 'react'
import { Table } from 'semantic-ui-react'

export default function PersonTableRow({firstName, lastName, email, age, income}) {
    return (
        <Table.Row>
            <Table.Cell>{firstName} {lastName}</Table.Cell>
            <Table.Cell>{age}</Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{income}</Table.Cell>
        </Table.Row>
    )
}

