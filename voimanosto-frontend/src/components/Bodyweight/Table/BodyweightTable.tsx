import React, { useContext, useState } from 'react'
import { Table, Button, Popup, Icon, Modal, Header } from 'semantic-ui-react'
import moment from 'moment'
import bodyweightService from '../../../services/bodyweightService'
import { UserContext } from '../../../context/userContext'
import BodyweightPlainForm from '../Form/PlainForm'

const BodyweightTable: React.FC<IBodyweightTableProps> = ({
  data,
  setData
}) => {
  const { user } = useContext(UserContext)
  const [formOpen, setFormOpen] = useState(false)
  const [bwFormOpen, setBwFormOpen] = useState(false)
  const [bodyweight, setBodyweight] = useState(0)
  const [indexOpen, setIndexOpen] = useState(-1)
  const [confirmDeleteBw, setConfirmDeleteBw] = useState(false)

  const handleBodyweightDelete = async (id: string) => {
    await bodyweightService.deleteBw({
      username: user.username,
      token: user.token,
      id: id
    })
    setData(data.filter(bw => bw.id !== id))
    setConfirmDeleteBw(false)
    setFormOpen(false)
  }

  const handleBodyweightEdit = async (bw: IBodyweight) => {
    const result = await bodyweightService.editBw({
      date: bw.date,
      id: bw.id,
      bodyweight: bodyweight,
      username: user.username,
      token: user.token
    })
    const newData = data.map(bw => {
      if (bw.id === result.id) {
        return { ...bw, bodyweight: result.bodyweight }
      } else return bw
    })
    setData(newData)
    setBodyweight(0)
    setBwFormOpen(false)
    setFormOpen(false)
  }

  return (
    <div>
      <Table inverted collapsing selectable columns={2}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Bodyweight</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((bw, i) => (
            <Popup
              flowing
              inverted
              style={{ border: '1px solid white' }}
              open={formOpen && i === indexOpen}
              basic
              position='right center'
              size='large'
              key={bw.id}
              content={
                <div>
                  <Button.Group inverted floated='left'>
                    <Popup
                      open={bwFormOpen}
                      onClose={() => setBwFormOpen(false)}
                      inverted
                      on='click'
                      position='bottom right'
                      trigger={
                        <Button
                          basic
                          color='orange'
                          onClick={() => setBwFormOpen(true)}
                        >
                          Edit
                        </Button>
                      }
                      content={
                        <BodyweightPlainForm
                          setBodyweight={setBodyweight}
                          addBodyweight={() => handleBodyweightEdit(bw)}
                          btnText='Edit'
                        />
                      }
                    />
                    <Button
                      basic
                      color='purple'
                      onClick={() => {
                        setConfirmDeleteBw(true)
                      }}
                    >
                      Delete
                    </Button>
                  </Button.Group>
                  <Icon
                    style={{ textAlign: 'right', verticalAlign: 'top' }}
                    name='close'
                    onClick={() => {
                      setFormOpen(false)
                      setConfirmDeleteBw(false)
                    }}
                  />
                  <Modal
                    centered={false}
                    className='inverted'
                    open={confirmDeleteBw}
                  >
                    <Header icon='exclamation' content='Confirm delete' />
                    <Modal.Content>
                      <p>
                        Are you sure you want to delete {bw.bodyweight} kg
                        reading on {moment(bw.date).format('MMMM DD, YYYY')}{' '}
                        from your records?
                      </p>
                      <Button.Group inverted widths='4' floated='left'>
                        <Button
                          color='green'
                          basic
                          onClick={() => setConfirmDeleteBw(false)}
                        >
                          No, don't delete
                        </Button>
                        <Button
                          color='red'
                          basic
                          onClick={() => handleBodyweightDelete(bw.id)}
                        >
                          Yes, I'm sure
                        </Button>
                      </Button.Group>
                    </Modal.Content>
                  </Modal>
                </div>
              }
              on='click'
              trigger={
                <Table.Row
                  onClick={() => {
                    setFormOpen(!formOpen)
                    setIndexOpen(i)
                  }}
                >
                  <Table.Cell>
                    {moment(bw.date).format('MMMM DD, YYYY')}
                  </Table.Cell>
                  <Table.Cell>{bw.bodyweight} kg</Table.Cell>
                </Table.Row>
              }
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default BodyweightTable
