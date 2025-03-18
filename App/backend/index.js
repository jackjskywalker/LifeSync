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

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});