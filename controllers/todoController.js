var bodyParser = require('body-parser')
var mongoose = require('mongoose')

//Connect to the database 
mongoose.connect('mongodb+srv://test:test@todo.ypklk.mongodb.net/todo?retryWrites=true&w=majority')

//Create s schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
// 	if(err) throw err;
// 	console.log('item saved')
// });

// var data = [{item: 'watch ted news'}, {item: 'study ML'}, {item: 'lab'}];
var urlencodedParser= bodyParser.urlencoded({extended: false});

module.exports = function(app){
	app.get('/todo', function(req, res){
		// get data from mongodb and pass it to the view
		Todo.find({}, function(err, data){ //{}- fetch everything
			if(err) throw err;
			res.render('todo', {todos: data});
		});
	});

	app.post('/todo',urlencodedParser, function(req, res){
		// get data from the view and add it to mongo db
		var newTodo = Todo(req.body).save(function(err, data){
			if(err) throw err;
			res.json(data);
		});
		// data.push(req.body);
		// res.json(data);
	});

	app.delete('/todo/:item', function(req, res){
		// delete the requested item from mongo db
		Todo.find({item: req.params.item}).deleteOne(function(err, data){
			if(err) throw err;
			res.json(data);
		});
		// data = data.filter(function(todo){
		// 	return todo.item.replace(/ /g, '-') !== req.params.item;
		// });
		// res.json(data);	
	});

};