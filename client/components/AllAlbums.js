import React, {Component, Fragment} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {fetchAlbums, fetchAlbumsByCategory} from '../store/album'
import {fetchUserThunk} from '../store/user'
import {Card, Image, Grid, Container} from 'semantic-ui-react'
import CategoryFilter from './CategoryFilter'

class AllAlbums extends Component {
  constructor(props) {
    super(props)
    this.handleCategoryClick = this.handleCategoryClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchAlbums()
    const user = this.props.user.user
    this.props.fetchUser(user)
  }

  async handleCategoryClick(event) {
    const id = event.target.value
    await this.props.fetchAlbumsByCategory(id)
  }

  render() {
    const {history} = this.props
    const {albums} = this.props

    return (
      <Container>
        <Grid>
          <Grid.Column width={2}>
            <CategoryFilter handleCategoryClick={this.handleCategoryClick} />
          </Grid.Column>
          {albums ? (
            <Grid.Column width={14}>
              <Card.Group doubling itemsPerRow={4} stackable>
                {_.map(albums, album => (
                  <Card key={album.id}>
                    <Image
                      size="medium"
                      bordered
                      centered
                      src={album.image}
                      onClick={() => history.push(`/albums/${album.id}`)}
                    />
                    <Card.Content>
                      <Fragment>
                        <Card.Header>{album.title}</Card.Header>
                        <Card.Meta>{album.description}</Card.Meta>
                        <Card.Description>${album.price}</Card.Description>
                      </Fragment>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            </Grid.Column>
          ) : null}
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    albums: state.album.albums,
    user: state.user,
    cart: state.user.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbums: () => dispatch(fetchAlbums()),
    fetchUser: user => dispatch(fetchUserThunk(user)),
    fetchAlbumsByCategory: id => dispatch(fetchAlbumsByCategory(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAlbums)
