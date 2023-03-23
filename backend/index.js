const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;

// Connect to DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the study tracker!!' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/clock', require('./routes/clockRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log('Server started on port ' + PORT));
