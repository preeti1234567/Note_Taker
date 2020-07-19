const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
let notes = [];

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
  return res.json(notes);
});
//
app.get("/api/notes/:id", function (req, res) {
  const targetObject = notes.find(
    (item) => item.id === parseInt(req.params.id)
  );
  if(targetObject){
    res.json(targetObject);
  }
  else{
    return res.status(404).json({ error: "No Record found for id selected" });
  }
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//adding new note
app.post("/api/notes", function (req, res) {
  var reqData = req.body;
  if (reqData.title && reqData.text) {
    var data = {
      id: getId(),
      title: reqData.title,
      text: reqData.text,
    };
    notes.push(data);
    updateDb();
    console.log("Added new note" + data.title);
    return res.status(201).json({ message: "new record created" });
  }
  return res.status(400).json({ error: "Not valid data" });
});

//deleting notes
app.delete("/api/notes/:id", function (req, res) {
  if (req.params.id) {
    const targetObject = notes.find(
      (item) => item.id === parseInt(req.params.id)
    );
    if (targetObject) {
      notes.splice(notes.indexOf(targetObject), 1);
      updateDb();
      console.log("Note has been deleted with id no:" + req.params.id);
      return res.status(200).json({ message: "record deleted" });
    } else {
      return res.status(404).json({ error: "No Record found for id selected" });
    }
  }
});

function updateDb() {
  fs.writeFile("db/db.json", JSON.stringify(notes, "/t"), (err) => {
    if (err) throw err;
    return true;
  });
}

function getId() {
  if (notes.length === 0) {
    return 1;
  } else {
    let lastDataInArray = notes.pop();
    notes.push(lastDataInArray);
    return lastDataInArray.id + 1;
  }
}

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
