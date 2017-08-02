


keyValStore.set('foo', {hello: 'world'});

// logs: {hello: 'world'}
export keyValStore.get('foo').then(val => console.log(val));
