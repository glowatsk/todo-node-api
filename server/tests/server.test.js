const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todos');


//before each it will remove the database
//runs before every test case

beforeEach((done) => {
    Todo.remove({}).then(()=> done());
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
            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
        }).catch((e) => done(e));
    })
})
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
                expect(todos.length).toBe(0);
                done();
            }).catch((e) => done(e));
        });
    });
});