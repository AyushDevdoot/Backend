const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Config = require('./src/Configs/Config.json'); // Import config.json
const v1Router = require('./src/Routes/v1.routes');
const app = express();


const environment = process.env.NODE_ENV || 'development';
const currentConfig = Config[environment];


app.use(bodyParser.json());
app.use(cors());


mongoose
  .connect(currentConfig.MONGODB_URL, {
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


app.listen(currentConfig.PORT, () => {
  console.log(`Server is running on port ${currentConfig.PORT}`);
});
