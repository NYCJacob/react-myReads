var idb = require("idb")

const dbName = 'Books2';
const version = 1;
const storeName = 'books3';


const dbPromise = idb.open(dbName, version,
     upgradeDb => {
       if(!upgradeDb.objectStoreNames
       .contains(storeName)){
         // Defining the Primary Key  passing optional key object
         upgradeDb.createObjectStore(storeName, {keyPath: 'id'});
   }
 });

 export function addProducts() {
    dbPromise.then(function(db) {
      var tx = db.transaction(storeName, 'readwrite');
      var store = tx.objectStore(storeName);
      var items = [
        {
          name: 'Dresser',
          id: 'dr-wht-ply',
          price: 399.99,
          color: 'white',
          material: 'plywood',
          description: 'A plain dresser with five drawers',
          quantity: 4
        },
        {
          name: 'Cabinet',
          id: 'ca-brn-ma',
          price: 799.99,
          color: 'brown',
          material: 'mahogany',
          description: 'An intricately-designed, antique cabinet',
          quantity: 11
        }
      ];
      items.forEach(function(item) {
        console.log('Adding item: ', item);
        store.add(item);
      });
      return tx.complete;
    }).then(function() {
      console.log('All items added successfully!');
    }).catch(function(e) {
      console.error('Error adding items: ', e);
    });
  }
