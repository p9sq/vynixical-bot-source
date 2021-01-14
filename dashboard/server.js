const express = require("express");
const app = express();

__dirname;

app.set("views", __dirname + "/views");
app.get("/", (req, res) => res.render("index.pug"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Now listening on port ${port}`));