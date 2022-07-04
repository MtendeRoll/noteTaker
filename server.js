const express = require("express");
const fs = require("fs");

const app = express();
const noteData = require("./db/db.json");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const { json } = require("express");
const { fstat } = require("fs");

const PORT = process.env.PORT || 4003;

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

// HTML routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//delete api route function??

// APP Listener
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
