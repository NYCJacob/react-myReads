var localDatabase = {}
var dbName = 'booksDb'
localDatabase.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
localDatabase.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange
localDatabase.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction

var db
export let initDB = (books) => {
  let promise = new Promise((resolve, reject) => {
    console.log('initDB start')
	  var request = localDatabase.indexedDB.open(dbName)

	  request.onupgradeneeded = function () {
	    console.log('initDB onupgradeneeded')
			// The database did not previously exist, so create object stores and indexes.
	    db = request.result
	    var store = db.createObjectStore('books', {keyPath: 'id'})
	    var bookIndex = store.createIndex('by_bookId', 'id')
	    var ratingIndex = store.createIndex('by_rating', 'rating')
			// Populate with initial data.
	    books.forEach(function (book) {
	      store.put(book)
	    })
	  }

	  request.onsuccess = function (res) {
	    db = request.result
    resolve(db)
	  }
  })
  return promise
}

/*
* get rating from local indexedDB using key which is book.id
*/
export let getBooks = (db) => {
  try {
    var tx = db.transaction('books', 'readonly')
    var store = tx.objectStore('books')
		// var index = store.index("by_bookId");

    store.openCursor().onsuccess = function (event) {
      var cursor = event.target.result
      if (cursor) {
        console.log('book object', cursor.value)
        console.log('Name for SSN ' + cursor.key + ' is ' + cursor.value.rating)
        cursor.continue()
      } else {
        console.log('No more entries!')
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export let updateRating = (rating, bookId) => {
  try {
    var tx = db.transaction('books', 'readwrite')
    var store = tx.objectStore('books')
    var request = store.get(bookId)
    request.onsuccess = function (event) {
      let book = event.target.result
			// update book.rating
      book.rating = rating
      var request =	store.put(book)
      request.onsuccess = function (e) {
        console.log('updated rating', e)
      }
      request.onerror = function (e) {
        console.log(e.value)
      }
    }
  } catch (e) {
    console.log(e)
  }
}
