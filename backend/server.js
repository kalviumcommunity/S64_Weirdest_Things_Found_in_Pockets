const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require("./routes/userRoutes")

const connectDatabase = require("./db/database");

app.use(cors());
app.use(express.json());

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`); // Log the error message
    console.log("Shutting down the server for handling uncaught exception");
    process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env",
    });
}

connectDatabase();


app.use('/api/users', userRoutes);

app.get('/ping', (req, res) => {
    res.send('pong');
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });