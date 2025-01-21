const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Import dotenv to load the environment variables
const v1Router = require('./src/Routes/v1.routes');
const app = express();
const Config = require('../Configs/Config.json');

// Use the environment variables
const mongoUri = process.env.MONGODB_URL;
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not defined in .env

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/v1', v1Router);

app.listen(port, () => {
  console.log("Server is running on port ${port}");
});