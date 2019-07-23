import React from 'react'
import { Table, Button, Popup } from 'semantic-ui-react'
import moment from 'moment'

const BodyweightTable: React.FC<IBodyweightProps> = ({ data }) => {
  return (
    <Table inverted collapsing selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Bodyweight</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(row => (
          <Popup
            basic
            position='right center'
            size='large'
            key={row.id}
            content={
              <Button.Group inverted>
                <Button basic color='orange'>
                  Edit
                </Button>
                <Button basic color='purple'>
                  Delete
                </Button>
              </Button.Group>
            }
            inverted
            style={{ border: '1px solid white' }}
            on='click'
            trigger={
              <Table.Row
                onClick={() => console.log(`${row.id} clicked`)}
                onFocus={() => console.log(`${row.date} selected now`)}
              >
                <Table.Cell>
                  {moment(row.date).format('MMMM DD, YYYY')}
                </Table.Cell>
                <Table.Cell>{row.bodyweight} kg</Table.Cell>
              </Table.Row>
            }
          />
        ))}
      </Table.Body>
    </Table>
  )
}

export default BodyweightTable
