const router = require("express").Router();
const userModels = require("../models/userModels");
const postModels = require("../models/postModels");
const bcrypt = require('bcrypt');

// update
router.put("/:id", async(req, res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(15);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await userModels.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true});
            res.status(200).json(updatedUser)
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(401).json("you can update only your account")
    }
})



// delete
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id) {
        try {
            const user = await userModels.findById(req.params.id);
            try{
                await postModels.deleteMany({username: user.username})
                await userModels.findByIdAndDelete(req.params.id);
                res.status(200).json("Delete successfully")
            } catch(err) {
                res.status(500).json(err)
            }
        } catch(err) {
            res.status(404).json("user not found")
        }
    } else {
        res.status(401).json("you can delete only your account")
    }
})


// find user
router.get("/:id", async(req, res) => {
    try{
        const user = await userModels.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others)
    } catch(err) {
        res.status(500).json(err)
    }
})



module.exports = router;