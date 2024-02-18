const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
require("dotenv").config();
// const cors = require("cors");
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// app.use(cors());
app.use(express.json());
app.use("/users",userRouter)
app.use("/notes", noteRouter);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Note Making System",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connection to DB.");
    console.log(`Server is running at ${process.env.PORT}`);
  } catch (err) {
    console.log(err);
  }
});
