import React from 'react'
import {connect} from 'react-redux'
import {fetchMetadata} from '../../store/allBookInfo.js'
import {Link} from 'react-router-dom'

function listToOptions(list) {
  if (!list) {
    return <option>Loading...</option>
  }
  return list.map(item => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    )
  })
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genre: 'none',
      author: 'none',
      search: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchMetadata()
    await this.setState({
      genre: this.props.currentParams.genre || 'none',
      author: this.props.currentParams.genre || 'none',
      search: this.props.currentParams.search || ''
    })
  }
  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit(event) {
    event.preventDefault()
    await this.props.changePage({
      ...this.props.currentParams,
      genre: this.state.genre,
      author: this.state.author,
      search: this.state.search,
      pageNumber: 1
    })
  }
  render() {
    console.log('props: ', this.props)
    const genres = listToOptions(this.props.metadata.genres)
    const authors = listToOptions(this.props.metadata.authors)
    const previousPage = () =>
      this.props.changePage({
        ...this.props.currentParams,
        pageNumber: Number(this.props.currentParams.pageNumber) - 1 || 1
      })
    const nextPage = () =>
      this.props.changePage({
        ...this.props.currentParams,
        pageNumber: Number(this.props.currentParams.pageNumber) + 1 || 2
      })
    return (
      <>
        <div>
          <button type="button" onClick={previousPage}>
            Previous
          </button>
          <button type="button" onClick={nextPage}>
            Next
          </button>
          <form onSubmit={this.handleSubmit}>
            <select name="author" onChange={this.handleChange}>
              <option value="none">Author</option>
              {authors}
            </select>
            <select name="genre" onChange={this.handleChange}>
              <option value="none">Genre</option>
              {genres}
            </select>
            <input
              onChange={this.handleChange}
              name="search"
              type="text"
              value={this.state.search || ''}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        {this.props.isAdmin ? <Link to="admin/addbook">ADD BOOK</Link> : ''}
      </>
    )
  }
}

function mapProps(state) {
  return {
    metadata: state.bookMetadata,
    isAdmin: !!state.user.isAdmin
  }
}

function mapDispatch(dispatch) {
  return {
    fetchMetadata() {
      dispatch(fetchMetadata())
    }
  }
}

export default connect(mapProps, mapDispatch)(Navbar)
