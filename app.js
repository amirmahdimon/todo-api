const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//connect to database

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

//test 

app.get('/', (req, res) => {
  res.send("API IS working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
