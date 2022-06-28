const express = require("express"); //INITIALISE
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const db =
  "mongodb+srv://uitask:uitask@cluster0.r0fmotv.mongodb.net/?retryWrites=true&w=majority";
const routes = require("./routes/route");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/route", routes);
// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "http://localhost:4000",
//     changeOrigin: true,
//   })
// );

app.use(express.static(path.join(__dirname, "taskui", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "taskui", "build", "index.html"));
});

mongoose.Promise = global.Promise;

mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else console.log("connected to db");
  }
);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port: 4000");
});
