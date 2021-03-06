const Clarifai = require ('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.Clarifai_API_KEY
});

const handleApiCall = (req,res) =>{
app.models
  .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then (data => {
  	res.json(data);
  })
  .catch (err => res.status(400).json('unable to fetch'))
}

const knex = require('knex')
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const handleImage = (req, res) => {
	const { id } = req.body;
	db('users').where('id','=',id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleApiCall: handleApiCall,
	handleImage: handleImage
};