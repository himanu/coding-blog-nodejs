const express = require("express")
const helmet = require("helmet")
const mongoose = require("mongoose")
require("dotenv").config();

const PORT = process.env.PORT || 5000

const app = express()

const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zmg0v.mongodb.net/Blog?retryWrites=true&w=majority`

const connectDB = async() => {
    try {
        await mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log("Connected to DB");
    } catch(err) {
        console.log("Error in mongodb ", err);
    }
}
const run = async () => {
    await connectDB();
    app.use(helmet())
    app.use(require("./routes/index.js"))

    app.listen(PORT, function () {
    console.log(`Express app listening on port ${PORT}`)
    })
}
run();