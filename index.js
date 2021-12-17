const express = require("express");
const app = express();
const dotenv = require("dotenv");
// const cors = require('cors')
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")

dotenv.config();
// app.use(cors());
app.use(express.json());



mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then((data) => {
    console.log(`mongodb connected with server: ${data.connection.host}`);
}) .catch(err => {
    console.log(err);
})



app.use("/api/auth", authRoute);




app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})