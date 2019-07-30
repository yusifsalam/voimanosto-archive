import React from 'react'
import { Table } from 'semantic-ui-react'

interface TableProps {
  data: IPR[]
}

const TableByType: React.FC<TableProps> = ({ data }) => {
  return (
    <Table inverted selectable collapsing singleLine unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Variation</Table.HeaderCell>
          <Table.HeaderCell>Reps</Table.HeaderCell>
          <Table.HeaderCell>Weight</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(row => (
          <Table.Row key={row._id}>
            <Table.Cell> {row.exercise.type.toUpperCase()}</Table.Cell>
            <Table.Cell>
              {' '}
              {row.exercise.name.charAt(0).toUpperCase() +
                row.exercise.name.slice(1)}
            </Table.Cell>
            <Table.Cell> {row.exercise.variation}</Table.Cell>
            <Table.Cell> {row.reps}</Table.Cell>
            <Table.Cell> {row.weight}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default TableByType
