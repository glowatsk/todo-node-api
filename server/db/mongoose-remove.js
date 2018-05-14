const {ObjectID} = require('mongodb');

const {mongoose} = require('mongoose');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');


// Remove all documents in the database, requires passing an object.
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove
//find one and remove, removes from database but returns document to use as an object


//Todo.findByIdAndRemove
//Removes Todo by ID

Todo.findByIdAndRemove('5af3439eb064e32f43272f6c').then((todo) => {
    console.log(todo);
});
