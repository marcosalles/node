const app = require('./config/express')();
const http = require('http').Server(app);

app.io = require('socket.io')(http);

const port = process.env.PORT || 3000;
http.listen(port, function () {
	console.log("Server started!");
});

