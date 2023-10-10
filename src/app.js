require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
console.log("first");

PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server run on port ${PORT}`));
