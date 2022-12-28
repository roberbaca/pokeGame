require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

app.use( bodyParser.urlencoded( {extended: true }));
app.use( bodyParser.json() );
app.use( cors() );

const userRouter = require("./routes/user");
app.use("/api/user", userRouter);

app.use( (req, res) => {
    res.statusCode = 404;
    res.send();    
});

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${PORT} ⭐️`);
});
