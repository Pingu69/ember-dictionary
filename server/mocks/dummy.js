module.exports = function(app) {
	var express = require('express');
	var dummyRouter = express.Router();

	dummyRouter.get('/', function(req, res) {
		res.send({
			"dummy": []
		});
	});

	dummyRouter.post('/', function(req, res) {
		res.status(201).end();
	});

	dummyRouter.get('/:id', function(req, res) {
		res.send({
			"dummy": {
				"id": req.params.id,
		  	  	"dictionary": {
		  	  		"one": 1,
					"two": "two",
					"three": false,
					"four": ["foo","bar","baz"],
					"five": {
						"foo": "bar",
						"bar": "baz"
					}
		  	  	}
			}
		});
	});

	dummyRouter.put('/:id', function(req, res) {
		res.send({
			"dummy": {
				"id": req.params.id
			}
		});
	});

	dummyRouter.delete('/:id', function(req, res) {
		res.status(204).end();
	});

	app.use('/api/dummy', dummyRouter);
};
