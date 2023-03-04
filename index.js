const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const usersRoute = require("./routes/v1/users.route");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", usersRoute);

app.all("*", (req, res) => {
  res.send("No routes found!");
});

// handle express errors
app.use(errorHandler);

app.listen(port, () => {
  console.log("App is listening on port ", port);
});

// when error can not be handled, close the app
process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
