const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes");
const port = 3000;

app.use(cors());

// app.use(
//   cors({
//     origin: "http://127.0.0.1:5500", // Allow requests from this origin
//     methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
//     allowedHeaders: "Content-Type,Authorization", // Allowed headers
//   })
// );

app.use("/", router);
// .use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

app.listen(process.env.port || port, () => {
  console.log(`Server listeninig on port ${port}`);
});
