const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 4000; // Changed port to avoid potential conflicts


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// In-memory user storage (replace with database in production)
const users = [];

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '1st.html'));
});


// Registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user exists
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password: hashedPassword
        };
        
        users.push(newUser);
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Enhanced server startup with detailed logging
const startServer = () => {
    try {
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server successfully started on http://localhost:${PORT}`);
            console.log('Available endpoints:');
            console.log('  POST /register - User registration');
            console.log('  POST /login - User login');
        });

        server.on('error', (err) => {
            console.error('Server error:', err);
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use`);
                console.log('Try using a different port or stopping the existing server');
            }
            process.exit(1);
        });

        server.on('listening', () => {
            console.log('Server is listening for connections...');
        });

        server.on('close', () => {
            console.log('Server has been closed');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
