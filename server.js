const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Config = require('./src/Configs/Config.json');
const v1Router = require('./src/Routes/v1.routes');
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(Config.MONGODB_URL)


app.use("/v1", v1Router)


app.listen(Config.PORT, () => {
    console.log(`Server is running on port ${Config.PORT}`);
});