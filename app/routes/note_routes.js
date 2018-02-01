var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
	app.get('/notes/:id', (req, res)=>{
	    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
		db.collection('notes').findOne(details, (err, result)=>{
			if (err) {
				res.send({ 'error':'an error has occured'});
			} else {
				res.send(result)
			}
		});
	});

	app.post('/notes', (req, res)=>{
		const note = {text: req.body.body, title: req.body.title};
		db.collection('notes').insert(note, (err, results)=>{
			if (err) {
				res.send({ 'error':'an error has occured'});
			} else {
				res.send(results.ops[0]);
			}
		});
	});
};