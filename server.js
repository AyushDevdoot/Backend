const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Config = require('./src/Configs/Config.json'); // Import the simplified config
const v1Router = require('./src/Routes/v1.routes');
const app = express();

// Use the simplified config
const mongoUri = Config.MONGODB_URL;
const port = process.env.PORT || Config.PORT;

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
  console.log(`Server is running on port ${port}`);
});
