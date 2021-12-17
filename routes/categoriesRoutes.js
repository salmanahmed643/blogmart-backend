const router = require("express").Router();
const categoryModels = require("../models/categoryModels");



// create categories
router.post("/", async(req, res) => {
    const newCats = new categoryModels(req.body);
    try{
        const savedCat = await newCats.save();
        res.status(200).json(savedCat);
    }catch(err) {
        res.status(500).json(err)
    }
})


// find all categories
router.get("/", async(req, res) => {
    try{
        const cats = await categoryModels.find();
        res.status(200).json(cats);
    }catch(err) {
        res.status(500).json(err)
    }
})



module.exports = router;