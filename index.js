const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
console.log(`Port= ${PORT}`)
// const uri = process.env.MONGODB_URI || "mongodb+srv://Bijan:12345@cluster0.5iynb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// set the view engine to ejs
app.set('view engine', 'ejs');

//set the public folder
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));


const routers = require("./routes/routers.js");
app.use("/", routers);

//Add these headers, very important!
app.use(function (req, res, next) {
    //allow all origins
    res.header("Access-Control-Allow-Origin", "*");

    //allow headers "Origin", "X-Requested-With", "Content-Type"
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Unable to start the server on port ${PORT}`);
    }
    console.log(`This HTTP server is running on port ${PORT}`);
});