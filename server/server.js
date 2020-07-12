const express = require("express");
const app = express();
const colors = require("colors");
const connectDB = require("./config/db");

//Connect to database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));


//ROUTERS
app.use("/", require("./api/components/routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>
    console.log(`Server is listening on port ${PORT}`.cyan.bold));
