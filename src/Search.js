import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class Search extends Component {
  // todo: propTypes

  state = {
    query : '',
    foundBooks : [],
    showResults : false
  }

  updateQuery = (query) => {
    this.setState( {query: query } )
  }

  clearQuery = () => {
    this.setState( {query: ''} )
  }

  render() {
    let foundBooks
    if ( this.state.query ) {
      BooksAPI.search( this.state.query, 10 ).then(
        (results) => {this.setState( { foundBooks : results} )
        this.state.showResults = true
          }
        )
    } else {
      console.log('Nothing found');
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={ (event) => this.updateQuery(event.target.value) }
          />
          </div>
        </div>
        <div className="search-books-results">
        {this.state.showResults ? (
          <Book
            shelfList={ this.state.foundBooks }
            />
          ) : ( '')
        }


        </div>
      </div>

    )

  }

}

export default Search
