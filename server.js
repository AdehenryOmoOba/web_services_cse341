const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello server nodemon...");
});

const port = 3000;

app.listen(process.env.port || port, () => {
  console.log(`Server listeninig on port ${port}`);
});
