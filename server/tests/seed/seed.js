const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

//Make an array of dummy Users
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'brandon@example.com',
    password: 'userOnePass',
    tokens:[{
        access:'auth',
        token: jwt.sign({_id: userOneId, accesss: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'brandon2@example.com',
    password: 'userTwoPass'
}];

//Make an array of dummy TODOS

const todos =[{
    _id: new ObjectID(),
    text: 'First Test Todo'
}, {
    _id: new ObjectID(),
    text: 'Second Test Todo',
    completed: true,
    completedAt: 333
}]

//before each it will remove the database
//runs before every test case

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = {todos, users, populateTodos, populateUsers};