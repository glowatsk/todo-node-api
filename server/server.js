require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

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
        res.send({ todos });
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
        return res.status(404).send();
    }
    //findbyID
    Todo.findById(id).then((todo) => {
        //success case
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        //error case
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    //get the id from URL
    var id = req.params.id;

    //Validate ID if not valid return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    //remove todo by ID
    Todo.findByIdAndRemove(id).then((todo) => {
        //success, check if doc actually came back, if not return 404
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
        //error send back 400 with empty body
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    //lodash allows us to pick components from the body
    var body = _.pick(req.body, ['text', 'completed']);

    //Validate ID if not valid return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        //This gets a new Unix Epic Date
        body.completedAt = new Date().getTime();
    } else {
        //
        body.completed = false;
        body.completedAt = null;
    }
    //have to use the mongo set property to change body
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        //Check if todo exists
        if (!todo) {
            return res.status(404).send();
        }
        //if it exists send the fetched todo
        res.send({ todo })
    }).catch((e) => {
        res.status(400).send();
    })

});

// POST /users

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        // Generate the authentication token
        return user.generateAuthToken();

    }).then((token) => {
        // x-auth x means a custom header and we are sending the JWT token.
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app }