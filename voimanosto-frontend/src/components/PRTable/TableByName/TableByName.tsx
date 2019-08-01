import React from 'react'
import { Table } from 'semantic-ui-react'

interface TableProps {
  data: {
    date: Date
    exercise: IExercise
    reps: number[]
    weight: number[]
  }[]
}

const TableByName: React.FC<TableProps> = ({ data }) => {
  const reps = Array.from({ length: 10 }, (x, i) => i + 1)
  return (
    <Table inverted selectable collapsing singleLine unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Variation</Table.HeaderCell>
          {reps.map(rep => (
            <Table.HeaderCell key={rep}>{rep}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(row => {
          return (
            <Table.Row key={row.exercise.variation}>
              <Table.Cell> {row.exercise.variation}</Table.Cell>
              {reps.map(rep => {
                let index = row.reps.indexOf(rep)
                if (index !== -1) {
                  return <Table.Cell key={rep}>{row.weight[index]}</Table.Cell>
                } else return <Table.Cell key={rep}>-</Table.Cell>
              })}
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default TableByName
