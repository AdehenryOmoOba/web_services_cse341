const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Users API",
    description: "Users API",
  },
  host: "localhost:8080",
  scheme: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./week1/contacts/routes.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
