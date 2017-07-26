var localDatabase = {};
var dbName = "booksDb";
localDatabase.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
localDatabase.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
localDatabase.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

var db;
export let initDB = ( books ) => {
	var request = localDatabase.indexedDB.open( dbName );

	request.onupgradeneeded = function() {
		// The database did not previously exist, so create object stores and indexes.
		db = request.result;
		var store = db.createObjectStore("books", {keyPath: "id"});
		var ratingIndex = store.createIndex("by_rating", "rating");

		// Populate with initial data.
		// store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
		books.forEach( function(book) {
			// book api does not have a rating attribute so adding it here
			book.rating = 0;
			// put book into indexedDB object store "books"
			store.put( book );
		})
	};

	request.onsuccess = function() {
		db = request.result;
	};

}
