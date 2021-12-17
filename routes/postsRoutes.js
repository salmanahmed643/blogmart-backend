const router = require("express").Router();
const userModels = require("../models/userModels");
const postModels = require("../models/postModels");

// create new post
router.post("/", async(req, res) => {
    const newPost = new postModels(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }catch(err) {
        res.status(500).json(err)
    }
})



// update post
router.put("/:id", async(req, res) => {
    try{
        const post = await postModels.findById(req.params.id);

        if(post.username === req.body.username) {

            try{
                const updatedPost = await postModels.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {new: true});
                res.status(200).json(updatedPost);
            } catch(err) {
                res.status(500).json(err)
            }
        } else{
            res.status(401).json("You can update only your post")
        }
    }catch(err) {
        res.status(500).json(err)
    }
})

// delete post
router.delete("/:id", async(req, res) => {
    try{
        const post = await postModels.findById(req.params.id);

        if(post.username === req.body.username) {

            try{
                await post.delete();
                res.status(200).json("post delete successfully");
            } catch(err) {
                res.status(500).json(err)
            }
        } else{
            res.status(401).json("You can delete only your post")
        }
    }catch(err) {
        res.status(500).json(err)
    }
})


// find post
router.get("/:id", async(req, res) => {
    try{
        const post = await postModels.findById(req.params.id);
        res.status(200).json(post)
    } catch(err) {
        res.status(500).json(err)
    }
})



module.exports = router;