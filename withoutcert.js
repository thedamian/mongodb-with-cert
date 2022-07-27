const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://{ --- Your Mongodb url with username & password here}?retryWrites=true&writeConcern=majority";
const client = new MongoClient(uri);

const database = client.db('sample_mflix');
const movies = database.collection('movies');
// Query for a movie that has the title 'Back to the Future'
const query = { title: 'Back to the Future' };
const movie =  movies.findOne(query, (err,movie) => {
  console.log(movie);
});
