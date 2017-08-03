### My Reads Project for Udacity React Nanodegree

### INSTALLATION
- npm install
- npm start   
- npm server will broadcast app on port 3000

## Usage/Features
- app will start by fetching books and displaying them in one of three shelves.
- a spinner will display when app is fetching data
- each book has a drop down to change the shelf or remove the book.
- there is a link at the bottom to search for new books to add to the list.
- search has basic type ahead feature based on set of valid search terms specified
by BooksAPI.
- each book has star ratings which respond to hover and click actions.
- changes made are updated to the server via the BooksAPI and locally to indexDB
- **Update** rating data now persists via indexDB thanks to a nice little package wrapper for
indexDB https://github.com/jakearchibald/idb
- hope to fork this to use Google Books api directly and work on offline progressive app features

## Issues
- this plugin seems to have a bug or conflict with Webpack so I used the plain css spinner list-books
-- https://github.com/KyleAMathews/react-spinkit  which is a port of https://github.com/tobiasahlin/SpinKit

- changes state with an array of objects proved difficult, this post helped
-- https://stackoverflow.com/questions/35174489/reactjs-setstate-of-object-key-in-array
-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

- star rating feature inspired by React: Up & Running by Stefanov and https://css-tricks.com/star-ratings/

- using indexDB proved difficult but these sites helped:
-- https://www.w3.org/TR/IndexedDB
-- https://www.ibm.com/developerworks/library/wa-indexeddb/index.html
-- https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
-- Finally getting data to persist via indexDB done when found this nice little wrapper
    https://github.com/jakearchibald/idb


## Backend Server  (this text was provided by Udacity)

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
