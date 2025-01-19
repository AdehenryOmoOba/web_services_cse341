// const express = require("express");
// const cors = require("cors");
// const app = express();
// const router = require("../../routes");
// const port = 3000;

// app.use(cors());
// app.use("/", router);

// app.listen(process.env.port || port, () => {
//   console.log(`Server listeninig on port ${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db");
const contactsRouter = require("./routes");

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", contactsRouter);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});
