// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); 

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// return the notes.html file
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Receive a new note, append it to the db.json file, and return the note
app.post("/api/notes", function(req, res) {
  var note = (req.body); 
  let newData;
  
  let readFile = fs.readFileSync("./db/db.json","utf-8");
  newData = JSON.parse(readFile);
  newData.push(note);
 

  fs.writeFile("./db/db.json", JSON.stringify(newData), function(error){
    if (error) {
      console.log(error);
    }
      console.log(newData);
      return res.json(newData)  
  });
});

//Read the db.json file and return all saved notes as a JSON
app.get("/api/notes", function(req, res) {

  fs.readFile("./db/db.json", "utf-8", function(error, data){
    if (error) {
      return console.log(error);
    }

    return res.json(JSON.parse(data));
  });

});


// return the index.html file
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

  


  