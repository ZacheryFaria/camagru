const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");

app = express();

app.use(bodyParser.json({limit: '3mb'}));
app.use(cors());

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/content", require("./routes/api/content"));

secret = fs.readFileSync("./secret.txt");

mongoose.connect("mongodb+srv://shortener:" + secret + "@42cluster-un8uy.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true})
	.then(() => console.log("Connected to mongo!"));

const port = 5000;

app.listen(port, () => {
	console.log("Server started");
});