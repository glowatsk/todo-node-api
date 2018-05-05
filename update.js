const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server');
    }
    console.log('Connected to MongoDB server on port 27017');

    const db = client.db('TodoApp')

    //This finds a document then updates the document $set is required to update properties to a new value

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5aede0820dcb9a6227c2f099')
    // }, {
    //     $set: {
    //         completed: true
    //     }

    // }, {returnOriginal: false}).then((result) => console.log(result));


    //Find a document then increment ($inc) age by one

     db.collection('Users').findOneAndUpdate({
         name: 'Brandon'
     }, {
         $inc: {age: 1}
     }, {
         returnOriginial: false
        }).then((result) => console.log(result));

     client.close();
});