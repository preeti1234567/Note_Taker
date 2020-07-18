var express = require ("express");
var path = require ("path");
const fs = require("fs");
var app = express();

var PORT =process.env.PORT|| 3000;

app.use (express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,"/public/index.html"));
})

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

fs.readFile("db/db.json","utf8",(err, data)=>{
    if (err) throw err; 
    var notes =JSON.parse(data);
})

app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });


  app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    updateDb();
        return console.log("Added new note" + newNote.title);
    }) 

    app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);})


// app.delete("/api/notes/:id", function(req, res) {
//     var index = req.body.index;
//     var temp = [];
//     for (var i = 0; i < note.length; i++) {
//         if (i !== parseInt(index)) {
//           temp.push(note[i]);
//         }
//     }
//     note = temp;
//     res.send("notes removed")
// })



