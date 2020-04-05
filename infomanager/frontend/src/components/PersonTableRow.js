import React from 'react'
import { Table } from 'semantic-ui-react'
import formatMoney from '../helpers/formatMoney'

export default function PersonTableRow({id, firstname, lastname, email, age, income}) {
    return (
        <Table.Row>
            <Table.Cell>{firstname} {lastname}</Table.Cell>
            <Table.Cell>{age}</Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{formatMoney(income)}</Table.Cell>
        </Table.Row>
    )
}

