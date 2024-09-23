const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
const allowedOrigins = ['https://sports-fest.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow credentials to be sent with requests
}));

app.use('/api', paymentRoutes);

// for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send('Something broke :/ Contact developer :)');
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});