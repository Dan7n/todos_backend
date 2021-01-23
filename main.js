const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");
const sassMiddleware = require('node-sass-middleware');
const PORT = process.env.PORT || 5000;
const Todo = require("./models/Todos")

const mongooseSettings = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine", "ejs");

/* 
 * TODO: redo this with try/catch and send back an error object - create error.ejs, make an if/else statement to check wheter
 * error has occured, display the error for the user by including it in your index.ejs
 */

app.get('/', async(req, res) => {
    try {
        const dataFromDB = await Todo.find()
        res.render("index", { data: dataFromDB, error: "" })
    } catch (err) {
        const error = err;
        res.render("index", { error: error })
    }
})

app.post("/", async(req, res) => {
    const newData = await new Todo({
        name: req.body.task
    }).save();
    res.redirect("/")
})

app.get("/delete/:id", async(req, res) => {
    const elementToBeDeleted = await Todo.deleteOne({ _id: req.params.id })
    res.redirect("/")
})

app.get("/check/:id", async(req, res) => {
    const checkedElement = await Todo.findOne({ _id: req.params.id })
    await Todo.updateOne({ checkedElement }, { $set: { checked: true } }, (e, s) => { if (e) { console.log(e) } });
    console.log(checkedElement)
        // if (checkedElement.checked = false) {
        //     await Todo.updateOne({ checkedElement }, { checked: true })
        // } else if (checkedElement.checked = true) {
        //     await Todo.updateOne({ checkedElement }, { checked: false })
        // }
    res.redirect("/")
});

app.get("/edit/:id", async(req, res) => {
    const elementToBeEdited = await Todo.findOne({
        _id: req.params.id
    });
    console.log(elementToBeEdited._id)
    const dataFromDB = await Todo.find()
    res.render("edit", { data: dataFromDB, elementToBeEdited: elementToBeEdited })
    app.post("/edit/:id", async(req, res) => {
        const updatedElement = await Todo.updateOne({ elementToBeEdited }, {
            name: req.body.name
        })
        res.redirect("/")
    })
})


mongoose.connect(process.env.DB_CONNECTION, mongooseSettings, (err) => {
    if (err) { return } else {
        app.listen(PORT, () => {
            console.log(`App is now live on port http://localhost:${PORT}/`);
        })
    }
})