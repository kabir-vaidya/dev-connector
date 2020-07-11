const express = require("express");
const app = express();
const colors = require("colors");
const connectDB = require("./config/db");



//Connect to database
connectDB();

//ROUTERS
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>
    console.log(`Server is listening on port ${PORT}`.cyan.bold));
