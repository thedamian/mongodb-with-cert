const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const credentials = require("./credentials")
const client = new MongoClient(credentials);
const database = client.db('sample_mflix');
const movies = database.collection('movies');
const express = require("express")
const app = express()
const port = 3001
app.use(express.json());

app.get("/",(req,res)=> {
  res.status(200).send("Yes! can I help you?")
})

app.get("/movies/:movietitle", (req,res)=> {
  const movietitle = req.params.movietitle
  console.log(`Looking for movie ${movietitle}`)
  const query = { title: movietitle };

  const movie =  movies.findOne(query, (err,movie) => {
    if (movie) {
      console.log("I found it!")
      res.status(200).json(movie);
    } else {
      console.log("not found")
      res.status(418).json({found:false})
    }
  })
})

app.post("/movie/",(req,res)=> {

    const newmovie = req.body;

    movies.insertOne(newmovie,(err,insertedid)=> {

      if (err) {
        console.error(err)
      } else {
        console.log(insertedid)
        //newmovie.insertedId = insertedid.insertedId
        res.status(201).json(newmovie)
      }
    })

})

app.listen(port, () => {
  console.log(`started on port ${port}`)
})