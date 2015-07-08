db.messages.aggregate([
	{ $project: {"To": "$headers.To", "From": "$headers.From", "ID": "$headers.Message-ID"}},
	{ $unwind: "$To"},
	{ $group: {_id: {ID: "$ID", From: "$From"}, "To" : {$addToSet : "$To"}}},
	{ $unwind: "$To"},
	{ $group: {_id: {From : "$_id.From", To : "$To"}, "count": {$sum : 1}}},
	{ $sort: { count : -1}},
	{ $limit: 1}
]);