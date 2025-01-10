const express = require("express");
const app = express();
const router = require("./routes");
const port = 3000;

app.use("/", router).use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.listen(process.env.port || port, () => {
  console.log(`Server listeninig on port ${port}`);
});
