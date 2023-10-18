require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const authRoute = require("../src/routes/auth-route");
const productRoute = require("../src/routes/product-route");
const shoppingCartRoute = require("../src/routes/shoppingcart-route");
const notFoundMiddleware = require("../src/middlewares/not-found");
const errorMiddleware = require("../src/middlewares/error");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/shoppingCart", shoppingCartRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server run on port ${PORT}`));
