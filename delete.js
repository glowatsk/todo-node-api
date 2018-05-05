// const MongoClient = require('mongodb').MongoClient;
// Using destructuring 
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server');
    }
    console.log('Connected to MongoDB server on port 27017');

    const db = client.db('TodoApp')

    // This will delete many different documents

    db.collection('Users').deleteMany({
          name: '*'
    }).then((result) => console.log(result));



    //This will delete one document

 /*    db.collection('Todos').deleteOne({
        text: 'Walk the dog'
    }).then((result) => console.log(result)) */


    //Find and delete one, this will print the document and then remove it


    /* db.collection('Todos').findOneAndDelete({
        text: 'Get Money'
    }).then((result) => console.log(result)) */

    client.close();
});