const express = require("express")
const server = express()

// Picking database
const db = require("./database/db")

// Public Folder Config
server.use(express.static("public"))

// Enabling req.body use in our application
server.use(express.urlencoded({extended:true}))

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
    req.query

    return res.render("creating-point.html")
})

server.post("/savepoint", (req, res) => {

    // Insert data at database
    const query = `INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
        ) VALUES (?,?,?,?,?,?,?);
    `
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    
    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("creating-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {
    const search = req.query.search

    // Empty search
    if(search == "") {
        return res.render("search-results.html", {total:0})
    }

        // Picking data from db
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // Showing html page with the data from db
        return res.render("search-results.html", { places: rows, total})
    })
})

// Turn On Server
server.listen(3000)