var express = require("express");
var path = require("path");
var fs = require("fs");
const { Console } = require("console");
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
var notes = [];

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

function ReadData() {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    notes = JSON.parse(data);
  });
}

app.get("/api/notes", function (req, res) {
  ReadData();
  console.log(notes);
  return res.json(notes);
});

app.get("/api/notes/:id", function (req, res) {
  var savedNotes = notes;
  res.json(savedNotes[Number(req.params.Id)]);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//adding new note
app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  if (newNote.title) {
    notes.push(newNote);
    updateDb();
    console.log("Added new note" + newNote.title);
    return res.status(201).json({ message: "new record created" });
  }
  return res.status(400).json({ error: "Not valid data" });
});


//deleting notes
app.delete("/api/notes/:id", function (req, res) {
  if (req.params.id) {
    console.log(req.params.id);
    console.log(notes);
    notes.splice(req.params.id, 1);
    console.log(notes);
    updateDb();
    console.log("Note has been deleted with id no:" + req.params.id);
    return res.status(200).json({ message: "record deleted" });
  }
  return res.status(404).json({ error: "Not valid id" });
});

function updateDb() {
  fs.writeFile("db/db.json", JSON.stringify(notes, "/t"), (err) => {
    if (err) throw err;
    return true;
  });
}

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
