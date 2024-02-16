var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");


var multer = require("multer");
var app = Express();
app.use(cors());  

var conn_string = "mongodb://localhost:27017/";

var DATABASENAME = "SongsInfoMERNApp";
var database;


app.listen(5010, ()=>{
    MongoClient.connect(conn_string , (err, client)=>{
      database = client.db(DATABASENAME);
      console.log("MongoDb connection Sucessfull");
    })
});

app.get('/api/songs', (req, res)=>{
    database.collection("songsInfo").find({}).toArray((err, result)=>{
        res.send(result);
    });
})

app.post('/api/songs/AddSongs', multer().none(), (request, response)=>{
    database.collection("songsInfo").count({}, function(error, numOfDocs){
        console.log(request.body)
        database.collection("songsInfo").insertOne({
        album:request.body.album,
        artist:request.body.artist,
        genere:request.body.genere,
        title:request.body.title,
       });
       response.json("Added Sucessfully")
    })
})


app.delete('/api/songs/deleteSongs', (req, res)=>{
    database.collection("songsInfo").deleteOne({
        id: request.query.id,
    });
    response.json("Deleted Sucessfully")
})