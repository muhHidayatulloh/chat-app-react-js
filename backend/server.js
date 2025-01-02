const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { syncModels } = require('./src/models');
const logger = require('./src/config/logger');
const { connectDB } = require('./src/config/db');

// Routes
const userRoute = require('./src/routes/userRoute');
const AuthRoute = require('./src/routes/AuthRoute');
const conversationRoute = require('./src/routes/ConversationRoute');

// Sync database models
syncModels();

const app = express();
app.use(cors()); // Agar frontend bisa berkomunikasi dengan backend

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

});

app.use('/api/v1/users', userRoute);

app.use('/api/v1/conversations', conversationRoute);

app.use('/auth/v1', AuthRoute);

// Middleware untuk request logging
app.use((req, res, next) => {
	logger.info(`${req.method} ${req.url} - ${req.ip} - ${res.statusCode} - ${res.statusMessage} `);
	next();
});

// Database connection
connectDB().then(() => {
	logger.info('Connected to the database');
});

// Error handling middleware
app.use((err, req, res, next) => {
	logger.error(`Error: ${err.message}`);
	res.status(500).json({ message: 'Server error' });
});

// Menghubungkan backend dengan frontend
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000", // React app URL
		methods: ["GET", "POST"],
	},
});

io.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`);
	logger.info(`User connected: ${socket.id}`);
	// Listen for incoming messages
	socket.on('message', (data) => {
		io.emit('message', data); // Emit message to all users
	});

	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
		logger.info(`User disconnected: ${socket.id}`);
	});
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	logger.info(`Server running on port ${PORT}`);
});
