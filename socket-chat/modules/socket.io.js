module.exports = function(server) {
	var io = require('socket.io')(server);
	var dateformat = require('dateformat');
	var CHAT_MESSAGE = 'chat message';

	io.on('connection', function (socket) {
		console.log('a user connected');
		socket.emit('connected', {});

		socket.on('user login', function (user) {
			console.log('user login: ' + user);
			io.emit(CHAT_MESSAGE, user.name + ' entered');

			socket.on('disconnect', function () {
				console.log('user disconnected');
				io.emit(CHAT_MESSAGE, user.name + ' exited');
			})
			.on('chat message', function (msg) {
				console.log('message: ' + msg);
				io.emit(CHAT_MESSAGE, {
					message: user.name + ': ' + msg,
					time: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
				});
			})
			.on('start typing', function (user) {
				console.log('start typing: ' + user);
				io.emit(CHAT_MESSAGE, {
					message: user + ' is typing'
				});
			})
			.on('cancel typing', function (user) {
				console.log('cancel typing: ' + user);
				io.emit('cancel typing', {
					message: user + ' is typing'
				});
			});
		});
	});
};
