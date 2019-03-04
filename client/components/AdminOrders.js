import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table, Button, Dropdown, Menu, Icon} from 'semantic-ui-react'
import {fetchOrders} from '../store/order'

class AdminOrders extends React.Component {
  constructor(props) {
    super(props)
    this.formatDate = this.formatDate.bind(this)
  }

  componentDidMount() {
    this.props.fetchOrders()
  }

  formatDate(date) {
    const formattedDate = date.split('T')
    return formattedDate[0]
  }

  render() {
    const {orders} = this.props

    const options = [
      {text: 'Created', value: 'created'},
      {text: 'Processing', value: 'processing'},
      {text: 'Cancelled', value: 'cancelled'},
      {text: 'Completed', value: 'completed'}
    ]

    return (
      <Table celled textAlign="center" verticalAlign="middle">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Order Number</Table.HeaderCell>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>Customer ID</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>View</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orders.map(order => {
            return (
              <Table.Row key={order.id}>
                <Table.Cell>{this.formatDate(order.orderDate)}</Table.Cell>
                <Table.Cell>{order.id}</Table.Cell>
                <Table.Cell>
                  {order.user.firstName} {order.user.lastName}
                </Table.Cell>
                <Table.Cell>{order.user.id}</Table.Cell>
                <Table.Cell>${order.total.toFixed(2)}</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder={order.orderStatus}
                    fluid
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/users/${order.userId}/orders/${order.id}`}>
                    <Button color="blue">View</Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders)
