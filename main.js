const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");
const PORT = process.env.PORT || 5000;
const Todo = require("./models/Todos")
const alert = require("alert");


const mongooseSettings = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }))

app.set("view engine", "ejs");



// ! fix this so that it prevents the from from submitting
app.get('/', async(req, res) => {
    try {
        const dataFromDB = await Todo.find()
        res.render("index", { data: dataFromDB, error: "" })
    } catch (err) {
        if (err) {
            throw new Error("Please enter correct data in the input field")
        }
    }
})

app.post("/", async(req, res) => {
    try {
        const newData = await new Todo({
            name: req.body.task
        }).save();
        res.redirect("/")
    } catch (err) {
        if (err) {
            res.render("index", {error: err})
                }
    }
})

app.get("/delete/:id", async(req, res) => {
    const elementToBeDeleted = await Todo.deleteOne({ _id: req.params.id })
    res.redirect("/")
})

app.get("/check/:id", async (req, res) => {
    const checkedElement = await Todo.findOne({ _id: req.params.id })
    if (checkedElement.checked === false) {
        await Todo.updateOne({_id: req.params.id}, {checked: "true"})
    } else {
        await Todo.updateOne({_id: req.params.id}, {checked: "false"}) 
    }
    res.redirect("/")
});


app.get("/edit/:id", async(req, res) => {
    const elementToBeEdited = await Todo.findOne({
        _id: req.params.id
    });
    const dataFromDB = await Todo.find()
    res.render("edit", { data: dataFromDB, elementToBeEdited: elementToBeEdited })
    try {
        app.post("/edit/:id", async(req, res) => {
            const updatedElement = await Todo.updateOne({ _id: req.params.id }, {
                name: req.body.name
            })
            res.redirect("/")
        })
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})


mongoose.connect(process.env.DB_CONNECTION, mongooseSettings, (err) => {
    if (err) { return } else {
        app.listen(PORT, () => {
            console.log(`App is now live on port http://localhost:${PORT}/`);
        })
    }
})