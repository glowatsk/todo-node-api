<h1>Todo API made with Express running on Node.</h1>

<h3>Deployed to heroku @ https://arcane-waters-78294.herokuapp.com</h3>

<h3>Routes</h3>
<li>/users</li>
<li>/todo</li>

<h5>/users</h5>

POST /users to create a user.

{
    "email": "brandon@example.com",
    "password": "examplepassword1"
}


POST /users/login to login as a user.

{
    "email": "brandon@example.com",
    "password": "examplepassword1"
}

GET /users/me

"x-auth": your token

returns logged in user

{
    _id: 12345ASd
"email": brandon@example.com
}

DELETE /users/me/token

removes token

GET /todos

"x-auth": your token

returns all todos

GET /todos/:id

"x-auth": your token,

fetches todo


POST /todos

"x-auth": your token

creates a new todo

{
    "text": "Something to add to your todos"
}

PATCH /todos/:id

"x-auth": your token,

updates a todo

{
    "text": "Something to add to your todos",
    "completed": boolean
}

DELETE /todos/:id

"x-auth": your token,

deletes a todo