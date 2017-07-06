import React from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     *     BooksAPI.update(book,shelf).then((books) => (this.setState( {books:books})) )
     * (prevState) => ({
    *           prevState[bookIndex].shelf : shelf })
    *
    * let bookIndex = this.state.books.map( (obj => obj.id === book.id))
    * console.log( bookIndex)
    * this.setState( {books.bookIndex : book} )
     */
     books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(
      (books) => {this.setState( {books:books} )})
  }

  changeShelf = (book, shelf, prevState) => {
    BooksAPI.update(book,shelf).then(( data ) => {
      let stateCopy = this.state.books.filter( (item) =>  item.id !== book.id  )
      book.shelf = shelf
      stateCopy.push( book )
      this.setState( {books : stateCopy} )
    })
  }


  render() {
    console.log( this.state );
    let currentShelf;
    let wantShelf;
    let readShelf;

    currentShelf = this.state.books.filter( (book) => book.shelf === 'currentlyReading' )
    readShelf = this.state.books.filter( (book) => book.shelf === 'read' )
    wantShelf = this.state.books.filter( (book) => book.shelf === 'wantToRead' )

    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                  <Book
                    shelfList={currentShelf}
                    onChangeShelf={this.changeShelf}
                    />
                  </div>
                </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                <Book
                  shelfList={wantShelf}
                  onChangeShelf={this.changeShelf}
                />
                </div>
              </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp
