var express = require("express");
var router = express.Router();
var monk = require("monk");

var db = monk("localhost:27017/Mercury");

router.get("/", function(req, resp){
	var collection = db.get("person");
	collection.find({}, function(err, data){
		if(err) throw err;
		resp.json(data);
	});
});

router.post("/", function(req, resp){
	var collection = db.get("person");
	collection.insert({
		name: req.body.name,
		age: req.body.age
	}, function(err, data){
		if(err) throw err;
		resp.json(data);
	});
});

router.get("/:id", function(req, resp){
	var collection = db.get("person");
	collection.findOne({_id: req.params.id}, function(err, data){
		if(err) throw err;
		resp.json(data);
	});
});

router.put("/:id", function(req, resp){
	var collection = db.get("person");
	collection.update({_id: req.params.id},{
		name: req.body.name,
		age: req.body.age
	}, function(err, data){
		if(err) throw err;
		resp.json(data);
	});
});

router.delete("/:id", function(req, resp){
	var collection = db.get("person");
	collection.remove({_id: req.params.id}, function(err, data){
		if(err) throw err;
		resp.json(data);
	});
});

module.exports = router;