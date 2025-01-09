const express = require("express");
const app = express();
const router = require("./routes");
const port = 3000;

app.use("/", router);

app.listen(process.env.port || port, () => {
  console.log(`Server listeninig on port ${port}`);
});
