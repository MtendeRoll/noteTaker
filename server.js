const express = require("express");
const fs = require("fs");

const app = express();

var PORT = process.env.PORT || 3001;

// APP Listener
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
