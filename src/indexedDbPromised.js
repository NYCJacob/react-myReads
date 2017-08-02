var idb = require("idb")

const dbName = 'Books1';
const version = 1;
const storeName = 'books';


const dbPromise = idb.open(dbName, version,
     upgradeDb => {
       if(!upgradeDb.objectStoreNames
       .contains(storeName)){
         // Defining the Primary Key  passing optional key object
         upgradeDb.createObjectStore(storeName, {keyPath: 'id'});
   }
 });

export function getAllBooks() {
  return  dbPromise.then(function(db) {
          	var tx = db.transaction(storeName, 'readonly');
          	var store = tx.objectStore(storeName);
          	return store.getAll();
            });
}


 export function addBooks( books ) {
    dbPromise.then(function(db) {
      var tx = db.transaction(storeName, 'readwrite');
      var store = tx.objectStore(storeName);

      books.forEach(function( book ) {
        console.log('Adding item: ', book);
        store.add(book);
      });
      return tx.complete;
    }).then(function() {
      console.log('All books added successfully!');
    }).catch(function(e) {
      console.error('Error adding items: ', e);
    });
  }
