import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Rating from './RatingComponent'
import * as localDB from './indexDB.js'


/**
* @description Creates each book, taking in array of books and the
*             changeShelf function passed down from BooksApp
* @constructor
*/
class Book extends Component {
  static propTypes = {
  shelfList: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

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
            <Rating bookRating={book.rating}/>
          </li>
          )  )}

      </ol>
    )
  }
}

  export default Book
