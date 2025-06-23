const express = require('express');
   const dotenv = require('dotenv');
   const { sequelize } = require('./src/models');
   const adminRoutes = require('./src/routes/adminRoutes');

   // Load environment variables
   dotenv.config();

   const app = express();

   // Middleware to parse JSON
   app.use(express.json());

   // Routes
   app.use('/admin', adminRoutes);

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