import React, { Component } from 'react';

class Book extends Component {
  // todo: propTypes

  // todo: state

  render() {
    const {shelfList, onChangeShelf} = this.props

    return (
      <ol className="books-grid">
      {
        shelfList.map( (book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select defaultValue={book.shelf} onChange={( e ) => onChangeShelf( book, e.target.value  )}  >
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
          )  )}
      </ol>
    )
  }
}

  export default Book
