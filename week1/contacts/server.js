const app = require("express")();
const bodyParser = require("body-parser");
const mongodb = require("./database/db");
const contactsRouter = require("./routes/routes");

const port = process.env.PORT || 8080;

app
  .use(bodyParser.json())
  .use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE",
      "OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Accept, Z-Key, Origin, X-Requested-With"
    );
    next();
  })
  .use("/", contactsRouter);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});
