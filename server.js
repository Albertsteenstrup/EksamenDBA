const express = require('express');
const app = express();

const PORT = 3000;

// Middleware
app.use(express.static("./views"));

// Kommer som string -> JSON
app.use(express.json());

//Indsætter en standard url til henholdsvis items og users
app.use("/users", require("./controllers/user-controllers"));
app.use("/items", require("./controllers/item-controllers"));

//Server running
app.listen(PORT,function () {
    console.log(`Server listens to ${PORT}`)
});