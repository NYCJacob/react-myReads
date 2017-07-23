import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './SearchTerms.js'
import './spinner.css'

/**
* @description Creates the seach display
* @constructor
*/
class Search extends Component {

  static propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  sendError: PropTypes.func.isRequired
}

  state = {
    query : '',
    foundBooks : [],
    showResults : false,
    errorMsg : '',
    searching : false,
    typeAhead : searchTerms
  }

/*
* https://stackoverflow.com/questions/154059/how-do-you-check-for-an-empty-string-in-javascript#154068
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions?redirectlocale=en-US&redirectslug=JavaScript%2FGuide%2FRegular_Expressions
* https://facebook.github.io/react/docs/introducing-jsx.html#jsx-prevents-injection-attacks
* seems React does the cleaning but I am still doing a simple cleaning for now pending research
*/

  /**
  * @description updateQuery: updates the query search as input is changed
  * @ param {string} text entered by user for search
  */
  updateQuery = (query) => {
    //* clear prior error message if any
    this.props.sendError('')
    if ( query.trim() ) {
      this.setState( {query} )
      this.sendQuery( query.trim() )
    } else {
      this.clearQuery()
    }
  }

  /**
  * @description clearQuery: clears previous query text via state
  */
  clearQuery = () => {
    this.setState( {query: '',
                    foundBooks : []
                  } )
  }

  /**
  * @description sendQuery: send the query, if it exists, and starts search css animation
  */
  sendQuery = () => {
    if ( this.state.query ) {
      this.setState( {searching : true} )

      /**
      * @description BooksAPI.search:  api search request, if error give user a message,
      *              sets searching css animation, displays book results if no error
      * @param {string} query as set in state
      * @param (integar) max number of results to return
      * @returns Promise of book objects or error property on returned object
      */
      BooksAPI.search( this.state.query, 10 ).then(
        (results) => {
          // check for error prop in results object
          // console.log( results );
          if ( results.error ) {
            this.setState( {errorMsg : 'No books found',
                            searching : false} )
          }
          // if results present display results
          if ( results.length > 0  && !results.error) {
            this.setState( { foundBooks : results,
                              showResults : true,
                              searching: false
                            } )
          }
        }
        ).catch( (error) => {
          console.log('There was a problem with sendQuery: ' + error.message);
          this.setState( {searching : false})
          this.props.sendError( `There was a problem with the request, please check your internet connection:  ${error.message}`)
          })
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
              ref="searchInput"
            />
            <datalist id='searchDataList'>

            </datalist>
          </div>
        </div>
        <div className="search-books-results">
          {/**
          * css animation set based on state.searching === true
          **/}
          {this.state.searching ?
            <div className={"sk-circle"}>
              <div className={"sk-circle1 sk-child"}></div>
              <div className={"sk-circle2 sk-child"}></div>
              <div className={"sk-circle3 sk-child"}></div>
              <div className={"sk-circle4 sk-child"}></div>
              <div className={"sk-circle5 sk-child"}></div>
              <div className={"sk-circle6 sk-child"}></div>
              <div className={"sk-circle7 sk-child"}></div>
              <div className={"sk-circle8 sk-child"}></div>
              <div className={"sk-circle9 sk-child"}></div>
              <div className={"sk-circle10 sk-child"}></div>
              <div className={"sk-circle11 sk-child"}></div>
              <div className={"sk-circle12 sk-child"}></div>
            </div>
            : ''
          }

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
