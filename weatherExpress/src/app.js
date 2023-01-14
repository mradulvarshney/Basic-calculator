const express = require('express');
const app = express();
const path = require('path');
const staticPath = path.join(__dirname, "../public");
const hbs = require('hbs');
const port = process.env.PORT || 8000;      // "process.env.PORT" used when site is hosted
const tempPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set('views', tempPath);
hbs.registerPartials(partialPath);
app.get("/", (req, res) => {
    res.render('index');
})

app.use(express.static(staticPath));

app.get("/weather", (req, res) => {
    res.render('weather');
})

app.get("/weather/*", (req, res) => {
    res.render("404");
})

app.get("*", (req, res) => {
    res.render("404");
})

app.listen(port, (err) => {
    if(err)
    {
        console.error("Error");
        return;
    }
    console.log("Listening to the port ", port);
})