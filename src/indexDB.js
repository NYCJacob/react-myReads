// see https://www.w3.org/TR/IndexedDB/
// and https://www.ibm.com/developerworks/library/wa-indexeddb/index.html

// const request = indexedDB.open("ratingsLib");
//
// request.onupgradeneeded = function() {
//   // The database did not previously exist, so create object stores and indexes.
//   var db = request.result;
//   var store = db.createObjectStore("books", {keyPath: "id"});
//   var ratingIndex = store.createIndex("by_rating", "rating", {unique: true});
//
//   // Populate with initial data.
//   store.put({rating: "5", id: 123456});
// };
//
// request.onsuccess = function() {
//   db = request.result;
// };
//
//
// export  {request}

const localDatabase = {};
localDatabase.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


/**
* const for database use
*/
const dbName = 'ratingLib';
const storeName = 'bookRatings'

function openDatabase() {
	var openRequest = localDatabase.indexedDB.open(dbName);
	openRequest.onerror = function(e) {
		console.log("Database error: " + e.target.errorCode);
	};

	openRequest.onsuccess = function(event) {
    console.log("Database created!");
		localDatabase.db = openRequest.result;
	};

  openRequest.onupgradeneeded = function(event) {
      // The database did not previously exist, so create object stores and indexes.
      console.log('Creating object stores');
      var ratingStore = event.currentTarget.result.createObjectStore(dbName, {keyPath: "id"});
    };
}

function addTestRecord() {
	console.log("adding record");
  console.log(localDatabase);
	let transaction = localDatabase.db.transaction("ratingLib", "readwrite");
	let store = transaction.objectStore("ratingLib");

	if (localDatabase != null && localDatabase.db != null) {
		var request = store.put({
			"id": "12345",
			"rating" : "5"
		});
		request.onsuccess = function(e) {
			console.log("Added test record");
		};

		request.onerror = function(e) {
			console.log(e.value);
		};
  }
}

openDatabase();
addTestRecord();
