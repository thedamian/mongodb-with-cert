const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
// Replace the following with values for your environment.
const credentials = require("./credentials")
const username = encodeURIComponent(credentials.username);
const clientPEMFile = encodeURIComponent("./X509-cert.pem");
const authMechanism = "MONGODB-X509";
// Replace the following with your MongoDB deployment's connection string.
const uri =
  `mongodb+srv://${username}@${credentials.server}/?authMechanism=${authMechanism}&tls=true&tlsCertificateKeyFile=${clientPEMFile}`;

const client = new MongoClient(uri);

const database = client.db('sample_mflix');
const movies = database.collection('movies');
// Query for a movie that has the title 'Back to the Future'
const query = { title: 'Back to the Future' };
const movie =  movies.findOne(query, (err,movie) => {
  if (err) {
    console.error("ERROR: ",err)
  }
  console.log(movie);
  client.close();
});


