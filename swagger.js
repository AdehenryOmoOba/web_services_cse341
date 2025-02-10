const swaggerAutogen = require("swagger-autogen")();

const hostBaseURL =
  process.env.NODE_ENV === "production"
    ? "cse341-miniblog.onrender.com"
    : "localhost:8080";

const doc = {
  info: {
    title: "Mini Blog",
    description: "Mini Blog API",
  },
  host: hostBaseURL,
  scheme: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = [
  "./week3_4/miniblog/routes/homeRoute.js",
  "./week3_4/miniblog/routes/nathanRoute.js",
  "./week3_4/miniblog/routes/userRoutes.js",
  "./week3_4/miniblog/routes/postRoutes.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc);
