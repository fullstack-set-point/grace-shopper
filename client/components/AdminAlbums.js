import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Table,
  Image,
  Button,
  Dropdown,
  Menu,
  Icon,
  Checkbox
} from 'semantic-ui-react'
import {fetchAlbums} from '../store/album'

class AdminAlbums extends React.Component {
  componentDidMount() {
    this.props.fetchAlbums()
  }

  render() {
    const {albums} = this.props

    const options = [
      {key: 'rock', text: 'Rock', value: 'rock'},
      {key: 'reggae', text: 'Reggae', value: 'reggae'},
      {key: 'country', text: 'Country', value: 'country'},
      {key: 'jazz', text: 'Jazz', value: 'jazz'},
      {key: 'rap', text: 'Rap', value: 'rap'},
      {key: 'electronic', text: 'Electronic', value: 'electronic'},
      {key: 'pop', text: 'Pop', value: 'pop'}
    ]

    return (
      <Table celled textAlign="center" verticalAlign="middle">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Cover</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Artist</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Inventory</Table.HeaderCell>
            <Table.HeaderCell>Available</Table.HeaderCell>
            <Table.HeaderCell>Categories</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.HeaderCell>View</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {albums.map(album => {
            return (
              <Table.Row key={album.id}>
                <Table.Cell>
                  <Image centered size="mini" src={album.photo} />
                </Table.Cell>
                <Table.Cell>{album.album}</Table.Cell>
                <Table.Cell>{album.artist}</Table.Cell>
                <Table.Cell>{album.year}</Table.Cell>
                <Table.Cell>${album.price}</Table.Cell>
                <Table.Cell>{album.quantity}</Table.Cell>
                <Table.Cell>
                  <Checkbox toggle />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    // placeholder={album.categories.map(category => {
                    //   return (
                    //     <a key ={category.id} className='ui label' value={category.name}>
                    //       {category.name}
                    //       <i className='delete icon'></i>
                    //     </a>
                    //   )
                    // })}
                    fluid
                    multiple
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button color="yellow">Edit</Button>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/albums/${album.id}`}>
                    <Button color="blue">View</Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="10">
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
  albums: state.album.albums
})

const mapDispatchToProps = dispatch => ({
  fetchAlbums: () => dispatch(fetchAlbums())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminAlbums)
