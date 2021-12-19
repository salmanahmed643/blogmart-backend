const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postsRoutes");
const categoriesRoute = require("./routes/categoriesRoutes");
const multer = require("multer");
const path = require ("path")



dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));



mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((data) => {
    console.log(`mongodb connected with server: ${data.connection.host}`);
}) .catch(err => {
    console.log(err);
})


const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("image has been uploaded")
})



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoriesRoute);



app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})