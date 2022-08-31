const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const port = process.env.PORT;

//* Node Server Socket io
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')

//* Public Path
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

//* Default response
// app.get("/",(req, res) => {
//     return res.send('Hola mundo')
// });

server.listen(port, (err) => {
	if (err) throw Error(err);

	console.log(`Servidor corriendo en el puerto ${port}`);
});
