import React from 'react'
import { Route, Link } from 'react-router-dom'
import Book from './Book'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import UserMsg from './UserMsg'
import './App.css'


class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
     books: []
  }
// not sure if this is actually doing anything
// todo: debub componentDidMount
  componentDidMount() {
    BooksAPI.getAll().then(
      (books) => {this.setState( {books:books} )})
  }

  toggleSearch = () => {
    this.setState((prevState) => (
      {showSearchPage: !prevState.showSearchPage}
    ) )}

  changeShelf = (book, shelf, prevState) => {
    BooksAPI.update(book,shelf).then(( data ) => {
      let stateCopy = this.state.books.filter( (item) =>  item.id !== book.id  )
      book.shelf = shelf
      stateCopy.push( book )
      this.setState( {books : stateCopy} )
    })
  }

  createUsrMsg = ( currentTotal, readTotal, wantTotal) => {
    return `Totals: Reading= ${currentTotal}, Read= ${ readTotal } and Want to Read= ${ wantTotal }`
  }

  render() {
    let currentShelf;
    let wantShelf;
    let readShelf;
    let usrMsg;

    // different shelf vars are arrays of books passed to the book component
    currentShelf = this.state.books.filter( (book) => book.shelf === 'currentlyReading' )
    readShelf = this.state.books.filter( (book) => book.shelf === 'read' )
    wantShelf = this.state.books.filter( (book) => book.shelf === 'wantToRead' )

    usrMsg = this.createUsrMsg( currentShelf.length, readShelf.length, wantShelf.length)

    return (
      <div className="app">
        <Route exact path="/" render={() => (
            // list books
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <UserMsg message={ usrMsg }/>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading { `${currentShelf.length}` }</h2>
                    <div className="bookshelf-books">
                    <Book
                      shelfList={currentShelf}
                      onChangeShelf={this.changeShelf}
                      />
                    </div>
                  </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read { `${wantShelf.length}` }</h2>
                  <div className="bookshelf-books">
                  <Book
                    shelfList={wantShelf}
                    onChangeShelf={this.changeShelf}
                  />
                  </div>
                </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read { `${readShelf.length}` }</h2>
                    <div className="bookshelf-books">
                      <Book
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
              <Search onChangeShelf={this.changeShelf} toggleSearch={this.toggleSearch} />
            )}
        />

      </div>

    );
  }
}

export default BooksApp
