import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALBUMS = 'GET_ALBUMS'
const GET_ALBUM = 'GET_ALBUM'
const GET_ALBUMS_BY_CATEGORY = 'GET_ALBUMS_BY_CATEGORY'
const NEW_ALBUM = 'NEW_ALBUM'
const UPDATE_ALBUM = 'UPDATE_ALBUM'

/**
 * INITIAL STATE
 */
const initialState = {
  albums: [],
  selectedAlbum: {}
}

/**
 * ACTION CREATORS
 */
const gotAlbums = albums => ({type: GET_ALBUMS, albums})

const gotAlbum = album => ({
  type: GET_ALBUM,
  album
})

const gotAlbumsByCategory = albums => ({
  type: GET_ALBUMS_BY_CATEGORY,
  albums
})

const newAlbum = album => ({
  type: NEW_ALBUM,
  album
})

const updateAlbum = album => ({
  type: UPDATE_ALBUM,
  album
})

/**
 * THUNK CREATORS
 */
export const fetchAlbums = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/albums')
    dispatch(gotAlbums(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAlbum = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/albums/${id}`)
    const action = gotAlbum(data)
    dispatch(action)
  }
}

export const fetchAlbumsByCategory = categoryId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/albums/categories/${categoryId}`)
    const action = gotAlbumsByCategory(data)
    dispatch(action)
  }
}

export const createAlbum = body => {
  return async dispatch => {
    const {data} = await axios.post('/api/albums', body)
    const action = newAlbum(data)
    dispatch(action)
  }
}

export const updateAlbumThunk = body => {
  return async dispatch => {
    const {data} = await axios.put('/api/albums', body)
    const action = updateAlbum(data)
    dispatch(action)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALBUMS:
      return {...state, albums: action.albums}
    case GET_ALBUM:
      return {...state, selectedAlbum: action.album}
    case GET_ALBUMS_BY_CATEGORY:
      return {...state, albums: action.albums}
    case NEW_ALBUM:
      return {...state, albums: [...state.albums, action.album]}
    case UPDATE_ALBUM:
      return {
        ...state,
        albums: [
          ...state.albums.map((album, index) => {
            if (index !== action.index) {
              return album
            }
            return [...album, action.album]
          })
        ]
      }
    default:
      return state
  }
}
