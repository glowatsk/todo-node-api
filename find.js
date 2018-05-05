const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server');
    }
    console.log('Connected to MongoDB server on port 27017');
    
    const db = client.db('TodoApp')

    db.collection('Todos').find({_id: }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
    console.log('Unable to fetch todos', err);
});
});