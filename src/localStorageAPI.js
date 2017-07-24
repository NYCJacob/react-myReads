let getLocalStor = () => {
    let bookRatings = localStorage.getItem( 'bookRatings' );
    if ( !bookRatings ) {
      return -1;
    } else {
      return bookRatings;
    }
}

let getRating = (bookId) => {
  localStorage.getItem
}


export { getLocalStor }
