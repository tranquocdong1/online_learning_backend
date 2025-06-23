const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./src/models');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');
const path = require('path');


// Load environment variables
dotenv.config();

const app = express();

// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Online Learning System API' });
});

// Sync database
sequelize.sync({ force: false })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Database sync error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});