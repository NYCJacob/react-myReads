var localDatabase = {};
var dbName = "booksDb";
localDatabase.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
localDatabase.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
localDatabase.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

var db;
export let initDB = ( books ) => {
	console.log("initDB start");
	var request = localDatabase.indexedDB.open( dbName );

	request.onupgradeneeded = function() {
		console.log("initDB onupgradeneeded");
		// The database did not previously exist, so create object stores and indexes.
		db = request.result;
		var store = db.createObjectStore("books", {keyPath: "id"});
		var bookIndex = store.createIndex("by_bookId", "id");
		var ratingIndex = store.createIndex("by_rating", "rating");

		// Populate with initial data.
		// store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
		books.forEach(function(book) {
				store.put( book );
		})

	};

	request.onsuccess = function() {
		console.log("initDB onsuccess");
		db = request.result;
	};

}

/*
* get rating from local indexedDB using key which is book.id
*/
export let getRating = (bookId) => {
	try{
		var tx = db.transaction("books", "readonly");
		var store = tx.objectStore("books");
		// var index = store.index("by_bookId");

		var request = store.get(bookId);
		request.onsuccess = function() {
		  var matching = request.result;
		  if (matching !== undefined) {
		    // A match was found.
				console.log(matching);
		    return(matching.rating);
		  } else {
		    // No match was found.
		    return -1;
		  }
		};
	}
	catch(e) {
		console.log(e);
	}
}
