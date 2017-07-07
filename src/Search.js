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

/*
* https://stackoverflow.com/questions/154059/how-do-you-check-for-an-empty-string-in-javascript#154068
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions?redirectlocale=en-US&redirectslug=JavaScript%2FGuide%2FRegular_Expressions
* https://facebook.github.io/react/docs/introducing-jsx.html#jsx-prevents-injection-attacks
* seems React does the cleaning but I am still doing a simple cleaning for now pending research
*/
  updateQuery = (query) => {
    let cleanQuery
    !!query.trim ? (
<<<<<<< HEAD
      this.setState( {query: query } )
=======
      cleanQuery= query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      this.setState( {query: cleanQuery } )
>>>>>>> parent of 52f5a22... Bug: working on moving api request out of update
    ) : (
      this.setState( {showResults : false } ),
      console.log('empty query')
    )
  }

  clearQuery = () => {
    this.setState( {query: ''} )
    this.setState( {foundBooks : []})
  }

  render() {
<<<<<<< HEAD
    let queryTerms = []
    console.log( this.state.query );
=======
    let foundBooks
>>>>>>> parent of 52f5a22... Bug: working on moving api request out of update
    if ( this.state.query ) {
      // cache query to enable network query timing
      queryTerms.push( this.state.query )
      console.log( queryTerms )

      // set timeout to pace netork requests
      setTimeout(function () {
        console.log( queryTerms )

        // send api request
        BooksAPI.search( queryTerms[0], 10 ).then(
          (results) => {
            // check if books have been returned
            console.log( results.lenth )
            if ( Array.isArray( results ) && results.length !== 0 ) {
              // process api results
              // set results in state
              this.setState( { foundBooks : results} )
              // show results via state
              this.setState( {showResults : true })
            } else {
              console.log( 'api results failed condition tests' );
            }
          }
        )
        // remove first item in array that was just processed by .search method
        queryTerms.shift()

      }, 500);

    } else {
      console.log( `Nothing in state query:  ${this.state.query}`);
      // check if prior search results still in state
      this.clearQuery
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
        {/*
        {console.log(this.state.showResults)}
        */}
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
