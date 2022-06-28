const express = require("express");
const fs = require("fs");

const app = express();
const noteData = require("./db/db.json");

var PORT = process.env.PORT || 3001;

// HTML routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// API routes
app.get("/api/notes", function (req, res) {
  console.log(noteData);
  res.json(noteData);
});

app.post("/api/notes", function (req, res) {
  let jsonData = req.body;
  jsonData["id"] = noteData.length + 1;
  noteData.push(jsonData);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
  res.json(true);
});

//delete api route??

// APP Listener
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
