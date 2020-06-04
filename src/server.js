const express = require("express")
const server = express()

// Public Folder Config
server.use(express.static("public"))

// Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Application Path
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Seu marketplace de coleta de resíduos"})
})

server.get("/create-point", (req, res) => {
    return res.render("creating-point.html")
})

server.get("/search", (req, res) => {
   return res.render("search-results.html")
})

// Turn On Server
server.listen(3000)