const express = require('express');
const connectDB = require('./config/db');
const leaveRoutes = require('./routes/leaveRoutes');

const app = express();

// Connect DB
connectDB();

app.use(express.json());

app.use('/api/leave', leaveRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
