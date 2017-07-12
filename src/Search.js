import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class Search extends Component {
  // todo: propTypes

  state = {
    query : '',
    foundBooks : [],
    showResults : false,
    errorMsg : ''
  }

/*
* https://stackoverflow.com/questions/154059/how-do-you-check-for-an-empty-string-in-javascript#154068
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions?redirectlocale=en-US&redirectslug=JavaScript%2FGuide%2FRegular_Expressions
* https://facebook.github.io/react/docs/introducing-jsx.html#jsx-prevents-injection-attacks
* seems React does the cleaning but I am still doing a simple cleaning for now pending research
*/
  updateQuery = (query) => {
    if ( query.trim() ) {
      this.setState( {query} )
      this.sendQuery( query.trim() )
    } else {
      this.clearQuery()
    }
  }

  clearQuery = () => {
    this.setState( {query: '',
                    foundBooks : []
                  } )
  }

  sendQuery = () => {
    if ( this.state.query ) {
      console.log( 'sendQuery' )
      BooksAPI.search( this.state.query, 10 ).then(
        (results) => {
          // check for error prop in results object
          // console.log( results );
          if ( results.error ) {
            this.setState( {errorMsg : 'No books found'} )
          }
          // if results present display results
          if ( results.length > 0  && !results.error) {
            this.setState( { foundBooks : results,
                              showResults : true
                            } )
          }
        }
      )
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close
          </Link>

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
            onChangeShelf={this.props.onChangeShelf}
            />
          ) : ( '')
        }
        </div>
      </div>
    )

  }
}

export default Search
