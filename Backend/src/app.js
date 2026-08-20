require("dotenv").config();

const express = require("express");

const connectDB = require("./DB/config");

const userRoutes = require("./Modules/Courses/index");

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

const startServer = async () => {

    await connectDB();

    app.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`);
    });

};

startServer();