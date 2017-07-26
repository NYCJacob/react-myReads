var localDatabase = {};
var dbName = "booksDb";
localDatabase.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
localDatabase.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
localDatabase.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

localDatabase.indexedDB.onerror = function (e) {
	console.log("Database error: " + e.target.errorCode);
};

 function openDatabase() {
	var openRequest = localDatabase.indexedDB.open(dbName);
	openRequest.onerror = function(e) {
		console.log("Database error: " + e.target.errorCode);
	};
	openRequest.onsuccess = function(event) {
		localDatabase.db = openRequest.result;
	};
}

 function createDatabase() {
	console.log('createDatabase: Deleting local database');
	var deleteDbRequest = localDatabase.indexedDB.deleteDatabase(dbName);
	deleteDbRequest.onsuccess = function (event) {
   		console.log('Database deleted');
   		var openRequest = localDatabase.indexedDB.open(dbName,1);

		openRequest.onerror = function(e) {
			console.log("Database error: " + e.target.errorCode);
		};
		openRequest.onsuccess = function(event) {
			console.log("Database created");
			localDatabase.db = openRequest.result;
		};
		openRequest.onupgradeneeded = function (evt) {
			console.log('Creating object stores');
			console.log( evt.currentTarget );
	    	var booksStore = evt.currentTarget.result.createObjectStore
				("books", {keyPath: "id"});
			booksStore.createIndex("titleIndex", "title", { unique: false });
			booksStore.createIndex("ratingIndex", "rating", { unique: false });
        };
        deleteDbRequest.onerror = function (e) {
        	console.log("Database error: " + e.target.errorCode);
        };

	};
}

export function populateDatabase( books ) {
	console.log("populating database");
	console.log( books );
	var transaction = localDatabase.db.transaction("books", "readwrite");
	var store = transaction.objectStore("books");

	if (localDatabase != null && localDatabase.db != null) {
		var request = store.put({
			"id": "E1",
			"title" : "React New York",
			"rating" : "5",
		});
		request.onsuccess = function(e) {
			console.log("Added E1");
			console.log(e);
		};

		request.onerror = function(e) {
			console.log(e.value);
		};
	}
}

function addEmployee() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";

		var transaction = localDatabase.db.transaction("employees", "readwrite");
		var store = transaction.objectStore("employees");

		if (localDatabase != null && localDatabase.db != null) {
			var request = store.add({
				"id": "E5",
				"first_name" : "Jane",
				"last_name" : "Doh",
				"email" : "jane.doh@somedomain.com",
				"street" : "123 Pennsylvania Avenue",
				"city" : "Washington D.C.",
				"state" : "DC",
				"zip_code" : "20500",
			});
			request.onsuccess = function(e) {
				result.innerHTML = "Employee record was added successfully.";;
			};

			request.onerror = function(e) {
				console.log(e.value);
				result.innerHTML = "Employee record was not added.";
			};
		}
	}
	catch(e){
		console.log(e);
	}
}

function updateEmployee() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";

		var transaction = localDatabase.db.transaction("employees", "readwrite");
		var store = transaction.objectStore("employees");
	  	var jsonStr;
	  	var employee;

		if (localDatabase != null && localDatabase.db != null) {

			store.get("E3").onsuccess = function(event) {
				employee = event.target.result;
				// save old value
				jsonStr = "OLD: " + JSON.stringify(employee);
				result.innerHTML = jsonStr;

				// update record
				employee.email = "john.adams@anotherdomain.com";

				var request = store.put(employee);

				request.onsuccess = function(e) {
				};

				request.onerror = function(e) {
					console.log(e.value);
				};

				// fetch record again
				store.get("E3").onsuccess = function(event) {
					employee = event.target.result;
					jsonStr = "<br/>NEW: " + JSON.stringify(employee);
					result.innerHTML = result.innerHTML  + jsonStr;
				};
			}; // fetch employee first time
		}
	}
	catch(e){
		console.log(e);
	}
}

function clearAllEmployees() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";

		if (localDatabase != null && localDatabase.db != null) {
			var store = localDatabase.db.transaction("employees", "readwrite").objectStore("employees");

			store.clear().onsuccess = function(event) {
				result.innerHTML = "'Employees' object store cleared";
			};
		}
	}
	catch(e){
		console.log(e);
	}
}

function fetchEmployee() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";
		if (localDatabase != null && localDatabase.db != null) {
			var store = localDatabase.db.transaction("employees").objectStore("employees");
			store.get("E3").onsuccess = function(event) {
				var employee = event.target.result;
				if (employee == null) {
					result.innerHTML = "employee not found";
				}
				else {
					var jsonStr = JSON.stringify(employee);
					result.innerHTML = jsonStr;
				}
			};
		}
	}
	catch(e){
		console.log(e);
	}
}

function fetchAllEmployees() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";

		if (localDatabase != null && localDatabase.db != null) {
			var store = localDatabase.db.transaction("employees").objectStore("employees");
			var request = store.openCursor();
			request.onsuccess = function(evt) {
			    var cursor = evt.target.result;
			    if (cursor) {
			    	var employee = cursor.value;
			    	var jsonStr = JSON.stringify(employee);
			    	result.innerHTML = result.innerHTML + "<br/>" + jsonStr;
			        cursor.continue();
			    }
			};
		}
	}
	catch(e){
		console.log(e);
	}
}

function fetchNewYorkEmployees() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";

		if (localDatabase != null && localDatabase.db != null) {
			var range = IDBKeyRange.only("New York");

			var store = localDatabase.db.transaction("employees").objectStore("employees");
			var index = store.index("stateIndex");

			index.openCursor(range).onsuccess = function(evt) {
			    var cursor = evt.target.result;
			    if (cursor) {
			    	var employee = cursor.value;
			    	var jsonStr = JSON.stringify(employee);
			    	result.innerHTML = result.innerHTML + "<br/>" + jsonStr;
			        cursor.continue();
			    }
			};
		}
	}
	catch(e){
		console.log(e);
	}
}

function fetchEmployeeByZipCode1() {
	try {
		var result = document.getElementById("result");
		result.innerHTML = "";

		if (localDatabase != null && localDatabase.db != null) {
			var store = localDatabase.db.transaction("employees").objectStore("employees");
			var index = store.index("zipIndex");

			var range = IDBKeyRange.lowerBound("92000");

			index.openCursor(range).onsuccess = function(evt) {
			    var cursor = evt.target.result;
			    if (cursor) {
			    	var employee = cursor.value;
			    	var jsonStr = JSON.stringify(employee);
			    	result.innerHTML = result.innerHTML + "<br/>" + jsonStr;
			        cursor.continue();
			    }
			};
		}
	}
	catch(e){
		console.log(e);
	}
}

export function loadLocalDB( books ) {
	createDatabase();
	openDatabase();
	// populateDatabase( books );
}
