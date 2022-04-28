const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const user = require("./routes/user");
const auth = require("./routes/auth");
const task = require("./routes/task")



const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/task", task)
app.use('/public',express.static('public'))


const port = process.env.PORT || 3003;
app.listen(port, () => console.log("Escuchando Puerto: " + port));

mongoose
  .connect("mongodb://localhost/task", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a Mongo DB"))
  .catch((error) => console.log("No se ha conectado a Mongo Db"));

  //omg
