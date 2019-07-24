import React from 'react'
import { Table } from 'semantic-ui-react'

interface TableProps {
  data: IPR[]
}

const TableByName: React.FC<TableProps> = ({ data }) => {
  const reps = Array.from({ length: 10 }, (x, i) => i + 1)
  return (
    <Table inverted selectable collapsing singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Variation</Table.HeaderCell>
          {reps.map(rep => (
            <Table.HeaderCell key={rep}>{rep}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(row => (
          <Table.Row key={row._id}>
            <Table.Cell> {row.exercise.variation}</Table.Cell>
            {reps.map(rep => {
              if (row.reps === rep) {
                return <Table.Cell key={rep}> {row.weight}</Table.Cell>
              } else return <Table.Cell key={rep}> -</Table.Cell>
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default TableByName
