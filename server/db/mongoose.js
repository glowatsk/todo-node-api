var mongoose = require('mongoose');

//set mongoose to use default promise library
mongoose.Promise = global.Promise;

//connect to mongodb database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};