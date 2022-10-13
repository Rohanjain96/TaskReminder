const express = require('express');
const dotenv = require("dotenv")
dotenv.config("../.env")
const cors = require('cors');
const corsoptions = { credentials: true,origin: "http://localhost:3000"};
const PORT = process.env.PORT || 5000
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/userRoutes")
const taskRouter = require("./Routes/taskRoutes")
const connection = require("./Database/db.js");
const app = express();
app.use(cors(corsoptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use("/user",userRouter)
app.use("/tasks",taskRouter)
connection();
app.listen(PORT,()=> console.log('listening on port '+PORT));
