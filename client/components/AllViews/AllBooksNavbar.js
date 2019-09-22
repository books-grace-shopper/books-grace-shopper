import React from 'react'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFilter: 'none'
    }
    this.handleChange = this.handleChange.bind(this)
  }
  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const previousPage = () =>
      this.props.changePage(
        this.props.currentPage - 1 || 1,
        this.state.selectedFilter
      )
    const nextPage = () =>
      this.props.changePage(
        this.props.currentPage + 1,
        this.state.selectedFilter
      )
    return (
      <div>
        <button type="button" onClick={previousPage}>
          Previous
        </button>
        <button type="button" onClick={nextPage}>
          Next
        </button>
        <select
          name="selectedFilter"
          value={this.state.selectedFilter}
          onChange={this.handleChange}
        >
          <option defaultValue="none">Filter by...</option>
          <option value="genre">Genre</option>
          <option value="author">Author</option>
        </select>
      </div>
    )
  }
}
