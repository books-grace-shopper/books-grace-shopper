import React from 'react'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genre: 'none',
      author: 'none'
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
      this.props.changePage({
        ...this.props.currentParams,
        pageNumber: Number(this.props.currentParams.pageNumber) - 1 || 1
      })
    const nextPage = () =>
      this.props.changePage({
        ...this.props.currentParams,
        pageNumber: Number(this.props.currentParams.pageNumber) + 1 || 1
      })
    return (
      <div>
        <button type="button" onClick={previousPage}>
          Previous
        </button>
        <button type="button" onClick={nextPage}>
          Next
        </button>
        <select>
          <option value={this.state.author} defaultValue="none">
            Author
          </option>
        </select>
        <select>
          <option value={this.state.genre} defaultValue="none">
            Genre
          </option>
        </select>
      </div>
    )
  }
}
