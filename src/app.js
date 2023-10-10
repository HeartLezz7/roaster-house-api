require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const authRoute = require("../src/routes/auth-route");
const notFoundMiddleware = require("../src/middlewares/not-found");
const errorMiddleware = require("../src/middlewares/error");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server run on port ${PORT}`));
