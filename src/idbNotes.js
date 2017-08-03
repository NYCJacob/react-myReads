idb.open(name, version, {upgradeCallback})

 upgradeCallback
 var dbPromise = idb.open('test-db', 1,
     function(upgradeDb) {
       if(!ugradeDb.objectStoreNames
       .contains('store')){
       upgradeDb.createObjectStore('store');
   }
 });


// Defining the Primary Key  passing optional key object
upgradeDb.createObjectStore('people', {keyPath: 'email'});

upgradeDb.createObjectStore('notes', {autoIncrement:true});

upgradeDb.createObjectStore('logs', {keyPath: 'id', autoIncrement: true});

// Defining Indexes example
var dbPromise = idb.open('test-db', 1,
	function(upgradeDb) {
		if(!upgradeDb.objectStoreNames
		.contains('ppl')) {
			var store = upgradeDb.createObjectStore('ppl')
			store.createIndex('email', 'email', {unique: true});
		}
	});


// Add data
dbPromise.then(function(db) {
	var transaction = db.transaction('ppl',
		'readwrite');
	var store = transaction.objectStore('ppl');
	store.add({name: "Fred"});
	return transaction.complete;
})


// Read date
dbPromise.then(function(db) {
	var tx = db.transaction('ppl', 'readonly');
	var store = tx.objectStore('ppl');
	return store.get('Fred');
});

// Update data
dbPromise.then(function(db) {
	var tx = db.transaction('store', 'readwrite');
	var store = tx.objectStore('store');
	var item = {name: "Fred", email: 'fred@example.com'}
	store.put(item);
	return tx.complete;
});

// Delete Data
dbPromise.then(function(db) {
	var tx = db.transaction('ppl', 'readwrite');
	var store = tx.objectStore('ppl');
	store.delete('Fred');
	return tx.complete;
});

// Searching data -------------
// 1     getAll() gets all data in array
dbPromise.then(function(db) {
	var tx = db.transaction('store', 'readonly');
	var store = tx.objectStore('store');
	return store.getAll();
});

// 2 cursors
// cursors (1)
dbPromise.then(function(db) {
	var tx = db.transaction('store', 'readonly');
	var store = tx.objectStore('store');
	return store.openCursor();
})
// cursors (2)
.then(function showItems(cursor) {
	if (!cursor) {return;}
	for (var field in cursor.value) {
		console.log(cursor.value[field]);
	}
	return cursor.continue().then(showItems);
})

// Specifying the Range to search
IDBKeyRange.lowerBound(indexKey);

IDBKeyRange.upperBound(indexKey);

IDBKeyRange.bound(lowerIndexKey, upperIndexKey);

var range = IDBKeyRange.lowerBound('soda');
dbPromise.then(function(db) {
	var tx = db.transaction('store', 'readonly');
	var store = tx.objectStore('store');
	return store.getAll(range);
});
