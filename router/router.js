const express = require("express")
const router = express.Router()

router.use(express.static(__dirname + "public"))

router.get('/', async(req, res) => {
    try {
        const dataFromDB = await Todo.find()
        res.render("index", { data: dataFromDB, error: "" })
    } catch (err) {
        const error = err;
        res.render("index", { error: error })
    }
})

router.post("/", async(req, res) => {
    const newData = await new Todo({
        name: req.body.task
    }).save();
    res.redirect("/")
})

router.get("/delete/:id", async(req, res) => {
    const elementToBeDeleted = await Todo.deleteOne({ _id: req.params.id })
    res.redirect("/")
})

router.get("/check/:id", async (req, res) => {
    const checkedElement = await Todo.findOne({ _id: req.params.id })
    if (checkedElement.checked === false) {
        await Todo.updateOne({_id: req.params.id}, {checked: "true"})
    } else {
        await Todo.updateOne({_id: req.params.id}, {checked: "false"}) 
    }
    res.redirect("/")
});

router.get("/edit/:id", async(req, res) => {
    const elementToBeEdited = await Todo.findOne({
        _id: req.params.id
    });
    const dataFromDB = await Todo.find()
    res.render("edit", { data: dataFromDB, elementToBeEdited: elementToBeEdited })
    try {
        router.post("/edit/:id", async(req, res) => {
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

module.exports = router;