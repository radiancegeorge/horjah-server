require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");
const user = require("./routes/users");
const port = process.env.port || 6000;
const cors = require("cors");
const products = require("./routes/products");
const useragent = require("express-useragent");
const allOrders = require("./routes/orders");
// const protect = require("./middlewares/auth.middleware");
const handleError = require("./middlewares/error.middleware");
const protect = require("./middlewares/auth.middleware");
require("./utils/sendMail");

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());

app.use("/user", user);
app.use("/products", products);
app.use("/orders", protect, allOrders);

app.use("/uploads", express.static("uploads"));

app.get("/ping", (req, res) => res.send("200 ok!"));

app.use(handleError);
db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`app listening on port:: ${port}`);
    });
  })
  .catch((err) => console.log(err));
