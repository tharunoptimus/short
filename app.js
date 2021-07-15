const express = require("express")
const app = express()
const port = process.env.PORT || 3003;
const path = require("path")
const mongoose = require("./database")
const server = app.listen(port, () => { console.log("Server listening on port " + port); });

app.set("view engine", "pug")
app.set("views", "views")

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

// Routes
const HomeRoutes = require("./routes/HomeRoutes")
// APIs
const linksApiRoutes = require("./routes/api/links")

app.use("/", HomeRoutes)
app.use("/home", HomeRoutes)

app.use("/api/links", linksApiRoutes)