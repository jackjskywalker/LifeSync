const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes); 

<<<<<<< HEAD
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
=======
const PORT = process.env.PORT || 5500;
>>>>>>> 531fd90118cdb16597f89dd139704a8c932e08bc

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;