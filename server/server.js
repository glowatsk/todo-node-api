var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

//Send post request for making a new Todo item

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then(((doc) => {
        res.send(doc);
    }), (e) => {
        res.status(400).send(e);
    });
});


//Send Get Request to fetch all Todos, returns an object.
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/123456

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    //validate id using isValid
    //return 404 and stop function - send back empty body
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    //findbyID
    Todo.find(ObjectID(id)).then((todo) => {
        //success case
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
        }).catch((e) => {
            //error case
            res.status(404).send();
        });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app}