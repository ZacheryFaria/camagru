const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", require("./routes/api/auth"));


const port = 5000;

app.listen(port, () => {
	console.log("Server started");
})