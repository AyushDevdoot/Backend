const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 
const v1Router = require('./src/Routes/v1.routes');
const app = express();

const mongoUri = process.env.MONGODB_URL;
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(mongoUri, {
  })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/v1', v1Router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
