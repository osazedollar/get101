// chat.js
const users = {}; // Object to store users
const rooms = ['General']; // Default room

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // When a user joins
        socket.on('user joined', ({ username, room }) => {
            socket.username = username;
            socket.room = room || 'General';
            socket.join(socket.room);

            // Add user to users object
            if (!users[socket.room]) {
                users[socket.room] = [];
            }
            users[socket.room].push(username);

            // Emit the updated user list and notify others
            io.in(socket.room).emit('user list', users[socket.room]);
            socket.broadcast.to(socket.room).emit('notification', `${username} joined the room`);
        });

        // Handle chat messages
        socket.on('chat message', (data) => {
            io.in(socket.room).emit('chat message', data);
        });

        // Handle typing indicators
        socket.on('typing', (username) => {
            socket.broadcast.to(socket.room).emit('typing', username);
        });

        // Handle user disconnect
        socket.on('disconnect', () => {
            if (socket.username && socket.room) {
                const index = users[socket.room].indexOf(socket.username);
                if (index !== -1) {
                    users[socket.room].splice(index, 1);
                    io.in(socket.room).emit('user list', users[socket.room]);
                    socket.broadcast.to(socket.room).emit('notification', `${socket.username} left the room`);
                }
            }
            console.log('User disconnected');
        });

        // Handle room creation
        socket.on('create room', (room) => {
            rooms.push(room);
            io.emit('room list', rooms);
        });

        // Handle joining a room
        socket.on('join room', (room) => {
            socket.leave(socket.room);
            socket.join(room);
            socket.room = room;

            // Emit the updated user list
            if (!users[socket.room]) {
                users[socket.room] = [];
            }
            io.in(socket.room).emit('user list', users[socket.room]);
        });
    });
};
