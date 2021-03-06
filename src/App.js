import React from 'react'
import { Route, Link } from 'react-router-dom'
import BookGrid from './Book'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import UserMsg from './UserMsg'
import './App.css'
import { searchTerms } from './SearchTerms'
/*
* indexedDB as pomised lib     https://github.com/jakearchibald/idb
*/
import * as idb from './indexedDbPromised.js';


/**
* @description Creates the parent object for the app
* @constructor
*/
class BooksApp extends React.Component {

  state = {
    showSearchPage: false,
     books: [],
     errorMsg: ''
  }

  /**
  * @description load BooksAPI only after component mounted to DOM
  */
  componentDidMount() {

    //TODO: check if this always complets before BooksAPI.getALL
    //      did not work in constructor
    // localDB holds values returned by promise
    var localDB;
    idb.getAllBooks().then(function(value) {
      localDB = value;
    });

    /**
    * @description api fetch method wrapper and calls initDB to start local indexedDB
    * @returns array of all book objects
    */
    BooksAPI.getAll().then(
      (books) => {
        // check if local data exists
        // if nothing local need to add rating attr and then store
        if (!localDB.length || localDB.length === 0) {
          books.forEach((book) => {
            book.rating = 0;
          });
          idb.addBooks(books);
          // set state using api books but could use local is exists
          this.setState({books});
        }else if (localDB.length > 0) {
          this.setState({books : localDB})
        }
      }
      ).catch( (error) => {
        console.log('There has been a problem with your BooksAPI.getAll() operation: ' + error.message);
        this.setErrorMsg( `There was a problem with the server request:  ${error.message}`)
        })
  }

  /**
  * @description toggleSearch: toggles search input page via setState
  */
  toggleSearch = () => {
    this.setState((prevState) => (
      {showSearchPage: !prevState.showSearchPage}
    ) )}

  /**
  * @description changeShelf: wrapper for update method, changing state safely and catching errors
  * @param {object} book- the book object clicked by the user
  * @param {string} shelf the one of three shelf value ["wantToRead", "currentlyReading", "read"]
  */
  changeShelf = (book, shelf) => {
    /**
    * @description BooksAPI.update: api method that updates books object passed with new shelf value
    * @param {object} book- the book object clicked by the user
    * @param {string} shelf the one of three shelf value ["wantToRead", "currentlyReading", "read"]
    * @returns a Promise in JSON format of the updated book date from POST request
    *          or error message via .catch if request fails
    */
    BooksAPI.update(book,shelf).then(( data ) => {
      let stateCopy = this.state.books.filter( (item) =>  item.id !== book.id  )
      book.shelf = shelf
      stateCopy.push( book )
      this.setState( {books : stateCopy} ) })
      .catch( (error) => {
        console.log('There has been a problem with your BooksAPI.getAll() operation: ' + error.message);
        this.setErrorMsg( `There was a problem with the server request:  ${error.message}`)
        })
    }

  /**
  * @description createUsrMsg: creates a user message.  This feature was abandoned for now
  *             because it seemed to cluter the UX and subtotal is now displaed in each shelf header
  */
  createUsrMsg = ( currentTotal, readTotal, wantTotal) => {
    return `Totals: Reading= ${currentTotal}, Read= ${ readTotal } and Want to Read= ${ wantTotal }`
  }

  /**
  * @description setErrorMsg: setter function passed to child components to enable
  *             child component to set user message without creating another display component
  * @param {string} error message content
  **/
  setErrorMsg = ( message ) => {
    this.setState({ errorMsg : message })
  }


  render() {
    let currentShelf;
    let wantShelf;
    let readShelf;

    /**
    *  @description spanStyle: custom style for dynamic book count text in shelf header
    **/
    const spanStyle = {
      fontSize: '.75em',
      fontStyle: 'italic'
    }

    /**
    *   different shelf vars are arrays of books passed to the book component after
    *   filter on the shelf value
    **/
    currentShelf = this.state.books.filter( (book) => book.shelf === 'currentlyReading' )
    readShelf = this.state.books.filter( (book) => book.shelf === 'read' )
    wantShelf = this.state.books.filter( (book) => book.shelf === 'wantToRead' )

    return (
      <div className="app">
        {/* Routes  */}
        <Route exact path="/" render={() => (
            // list books
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              {/* if error msg in state display error message */}
              { this.state.errorMsg ?
                <UserMsg message={ this.state.errorMsg }/>
                : ''
              }

              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading <span style={spanStyle}> {currentShelf.length} Book(s) </span></h2>
                    <div className="bookshelf-books">
                    <BookGrid
                      shelfList={currentShelf}
                      onChangeShelf={this.changeShelf}
                      />
                    </div>
                  </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read  <span style={spanStyle}> {wantShelf.length} Book(s) </span> </h2>
                  <div className="bookshelf-books">
                  <BookGrid
                    shelfList={wantShelf}
                    onChangeShelf={this.changeShelf}
                  />
                  </div>
                </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read <span style={spanStyle}> {readShelf.length} Book(s) </span></h2>
                    <div className="bookshelf-books">
                      <BookGrid
                        shelfList={readShelf}
                        onChangeShelf={this.changeShelf}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link
                    to="/search"
                    onClick={ () => this.toggleSearch() }>Add a book
                </Link>
              </div>
            </div>
            )}
          />

        <Route path="/search" render={() => (
            <div>
              <Search typeAheadData={searchTerms} onChangeShelf={this.changeShelf} toggleSearch={this.toggleSearch} sendError={this.setErrorMsg} />
              {/* if error msg in state display error message */}
              { this.state.errorMsg &&   <UserMsg message={ this.state.errorMsg }/>
              }
            </div>
            )}

        />

      </div>

    );
  }
}

export default BooksApp
