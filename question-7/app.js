var MongoClient = require('mongodb').MongoClient;
var totalDeleted = 0;
MongoClient.connect('mongodb://127.0.0.1/photos', function(err, db){
	db.collection('images').find({}, function(err, data){
		if (err) throw err;
		data.forEach(function(image){
			db.collection('albums').findOne({ 'images' : image._id }, function(err, album) {
				if (err) throw err;
				if (!album) {
					console.log('Deleting document...');
					db.collection('images').remove({ "_id" : image._id }, function(err, deleted){
						if (err) throw err;
						console.log('Document deleted.');
					});
				} else {
					console.log('Skipping document...');
				}
			});
		});
	});
});