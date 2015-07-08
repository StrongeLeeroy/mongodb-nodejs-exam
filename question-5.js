// Add this code in the TODO section of the posts.js file

var query = { "permalink" : permalink };
var update = { $inc : updateSelector};
var settings = { upsert : true };
posts.update(query, update, settings, function (err, result) {
    if (err) return callback(err, null);
    console.log("Updated likes");
    callback(err, result);
});