var localDatabase = {};
var dbName = "booksDb";
localDatabase.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
localDatabase.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
localDatabase.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

var db;
export let promiseDB = new Promise( (resolve, reject)=> {
		console.log("initDB start");
		var request = localDatabase.indexedDB.open( dbName, 1 );

		request.onupgradeneeded = function() {
			console.log("initDB onupgradeneeded");
			// The database did not previously exist, so create object stores and indexes.
			db = request.result;
			var store = db.createObjectStore("books", {keyPath: "id"});
			var bookIndex = store.createIndex("by_bookId", "id");
			var ratingIndex = store.createIndex("by_rating", "rating");
		};

		request.onsuccess = function() {
			console.log("initDB onsuccess");
			db = request.result;
			resolve( db )
		};
		request.onerror = (e)=> {
			console.log(Error(e));
			reject(Error(e));
		}
	} )    // end promise


/*
* get rating from local indexedDB using key which is book.id
*/
export let getRatings = () => {
	let storedBooks = [];
	try{
		if ( db !=null ) {
			var tx = db.transaction("books", "readonly");
			var store = tx.objectStore("books");
			var requestCursor = store.openCursor();
			requestCursor.onsuccess = (evt) => {
				let cursor = evt.target.result;
				if(cursor) {
					storedBooks.push(cursor.value);
					cursor.continue();
				}
			}
		}
		return storedBooks;
	}
	catch(e) {
		console.error(e);
	}
}

export let updateRating = (rating, bookId) => {
	console.log('updateRating');
	try{
		var tx = db.transaction("books", "readwrite");
		var store = tx.objectStore("books");
		var request = store.get(bookId);
		request.onerror = (evt) => {
			console.error(evt);
		}
		request.onsuccess = function(event) {
			let book = event.target.result;
			// update book.rating
			book.rating = rating;
			var updateRatingRequest =	store.put( book );
			updateRatingRequest.onsuccess = function(e) {
				console.log("updated rating", e.target.result);
			};
			updateRatingRequest.onerror = function(e) {
				console.log(e.value);
			}
		}

	}
	catch(e) {
		console.log(e);
	}
}

export let saveBooks = (books) => {
	console.log('saveBooks');
	try{
		var tx = db.transaction("books", "readwrite");
				tx.onerror= (evt) => {
					console.error(evt)}
		var store = tx.objectStore("books");
		// this named index was set when db created
		var index = store.index("by_bookId");
		if (db != null) {
			books.forEach((book)=> {
				// check if book is in indexedDB
				var range = IDBKeyRange.only(book.id)
				index.openCursor(range).onsuccess = (evt) => {
					// check result
					let cursor = evt.target.result;
					// if there is a result then book exits, perform update
					if (cursor) {
						// update record
						let book = cursor.value;
						let updateRequest = store.put(book);
						updateRequest.onsuccess = (evt) => {
							console.log('updateRequest: ', evt.target.result);
						}
					} else {
						// add record
						let addRequest = store.add(book);
						addRequest.onsuccess = (evt) => {
							console.log(evt.target.result);
						}
					}

				}

			});
		}
	}
	catch(e){
		console.error(e);
	}
}
