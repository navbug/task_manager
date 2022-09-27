const express = require("express");
const app = express();
const tasks = require("./routes/taskRouter");
const connectDB = require("./db/connect");
//dotenv to secure credentials like password in connection string
require("dotenv").config();
const notFound = require("./middleware/not-found");

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);

const port = 5000;

//Start the server only after successfully connecting to db
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        })
        
    } catch(error) {
        console.log(error);
    }
}

start();

