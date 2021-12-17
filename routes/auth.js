const router = require("express").Router();
const userModels = require("../models/userModels");
const bcrypt = require('bcrypt');

// signup
router.post("/signup", async(req, res) => {
    try{
        const salt = await bcrypt.genSalt(15);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = userModels({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });

        const user = await newUser.save();
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
})





// sign in
router.post("/signin", async(req, res) => {
    try{
        const user = await userModels.findOne({username: req.body.username});
        !user && res.status(400).json("wrong username");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("wrong password");

        const {password, ...others} = user._doc;
        res.status(200).json(others)
    }catch(err) {
        res.status(500).json(err)
    }
})




module.exports = router;