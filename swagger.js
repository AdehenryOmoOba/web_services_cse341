const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Users API",
    description: "Users API",
  },
  host: "cse341-miniblog.onrender.com",
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
