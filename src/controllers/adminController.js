const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const { Admin } = require('../models');

    const login = async (req, res) => {
        try {
            const { username, password } = req.body;

            // Validate input
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            // Find admin
            const admin = await Admin.findOne({ where: { username } });
            if (!admin) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT
            const token = jwt.sign(
                { id: admin.id, username: admin.username, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    };

    module.exports = { login };