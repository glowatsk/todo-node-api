const _ = require('lodash');
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todos');

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

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
});


//describe is in the mocha test suite set it up to send a post request to create a new todo application
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo test';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            
            //Make a call to the database to verify the test todo is created
            //Assert there is a Todo
            //check if it matches text variable
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
        }).catch((e) => done(e));
    });
});
    it('Should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        //make sure you get 404 back
        var hexId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        // /todos/123456
        request(app)
        .get('/todos/123456')
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
        //query database using findById
        Todo.findById(hexId).then((todo) => {
            expect(todo).toBeFalsy();
            done();
        }).catch((e) => done(e));
     });
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
        .delete('/todos/123456')
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        //grab id of first item
        var requestID = todos[0]._id
        var text = 'This has been changed'
        //update text, set completed true
        request(app)
        .patch(`/todos/${requestID}`)
        .send({
            text, 
            completed: true
        })
          // expect 200 response
        .expect(200)
        //text is changed, completed is true, completedAt is a number using .toBeA
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).not.toBe(null);
        })
        .end(done)
    });

    it('should clear completedAt when todo is not completed', (done) => {
        //grab id of second todo item
        var idSecondRequestItem = todos[1]._id
        // update text, set completed to false
        request(app)
        .patch(`/todos/${idSecondRequestItem}`)
        .send({
            text:"I haven't done this yet",
            completed: false
        })
        //200
        .expect(200)
        //text is changed, completed is now false, completed at is null .toNotExist
        .expect((res) => {
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBe(null);
        })
        .end(done)
    })
});