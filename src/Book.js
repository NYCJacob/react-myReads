import React, { Component } from 'react';

class Book extends Component {
  // todo: propTypes
  // todo: state

  // https://facebook.github.io/react/docs/optimizing-performance.html
  // not working
    shouldComponentUdate() {
      if ( this.props.shelfList.length === 0) {
        return false
      }
      return true
    }


  render() {
    const {shelfList, onChangeShelf} = this.props
    // console.log( shelfList);
    return (
      <ol className="books-grid">
      {
        shelfList.map( (book, idx) => (

          <li key={idx}>
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
