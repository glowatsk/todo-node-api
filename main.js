// const MongoClient = require('mongodb').MongoClient;
// Using destructuring 
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server');
    }
    console.log('Connected to MongoDB server on port 27017');

    const db = client.db('TodoApp')

   /*  db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert Todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2))
    }); */
    
    /* db.collection('Users').insertOne({
        name: 'Brandon',
        age: '27',
        location: 'Canada',
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert User', err);
        }

        console.log('Succesfully added User:', JSON.stringify(result.ops, undefined, 2), result.ops[0]._id.getTimestamp());
    })

    client.close(); */

    db.collection('Users').find({
        name: 'Brandon'
    }).toArray().then(((docs) => {
        console.log(docs)
    }))

    client.close();
});