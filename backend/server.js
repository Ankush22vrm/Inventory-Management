const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();


const app = express();

app.use(cors({
  origin: [process.env.CLIENT_URL || "http://localhost:3000"],
  credentials: true,
}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

['uploads/userProfiles', 'uploads/productImages'].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

app.use('/uploads/productImages', express.static(path.join(__dirname, '/uploads/productImages')));
app.use('/uploads/userProfiles', express.static(path.join(__dirname, '/uploads/userProfiles')));

app.use('/api/login', require('./routes/loginRoute'));
app.use('/api/signup', require('./routes/signupRoute'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/warehouses', require('./routes/warehouseRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
