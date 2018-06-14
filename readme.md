<h1>Todo API made with Express running on Node.</h1>

<h3>Deployed to heroku @ https://arcane-waters-78294.herokuapp.com</h3>

<h3>Routes</h3>
<li>/users</li>
<li>/todo</li>

<h3>/users</h3>

<h4>POST /users to create a user.</h4>

{
    "email": "brandon@example.com",
    "password": "examplepassword1"
}


<h4>POST /users/login to login as a user.</h4>

{
    "email": "brandon@example.com",
    "password": "examplepassword1"
}

<h4>GET /users/me</h4>

"x-auth": your token

returns logged in user

{
    _id: 12345ASd,
"email": brandon@example.com
}

<h4>DELETE /users/me/token</h4>

removes token

<h4>GET /todos</h4>

"x-auth": your token

returns all todos

<h4>GET /todos/:id</h4>

"x-auth": your token,

fetches todo

<h4>POST /todos</h4>

"x-auth": your token

creates a new todo

{
    "text": "Something to add to your todos"
}

<h4>PATCH /todos/:id</h4>

"x-auth": your token,

updates a todo

{
    "text": "Something to add to your todos",
    "completed": boolean
}

<h4>DELETE /todos/:id</h4>

"x-auth": your token,

deletes a todo