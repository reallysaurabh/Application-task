import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }

  onSearch(query) {
    this.setState({ query });
    this.props.onSearchChange(query);
  }

  render() {
    return (
      <div className="form-group">
        <input
          placeholder="technology"
          className="form-control"
          value={this.state.query}
          onChange={event => this.onSearch(event.target.value)}
        />
      </div>
    );
  }
}

export default SearchBar;
