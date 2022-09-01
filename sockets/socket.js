const { io } = require('../index')

const Band = require('../models/band')
const Bands = require('../models/bands')
const bands = new Bands()

bands.addBand(new Band('the killers'))
bands.addBand(new Band('Bon Jovi'))
bands.addBand(new Band('Heroes del silencio'))
bands.addBand(new Band('Metallica'))

//console.log(bands)

//* Sockets Messages
io.on('connection', (client) => {
    console.log('client connected')
	
	client.emit('active-bands', bands.getBands())

    client.on('message', (data) => {
		console.log(`message: ${data.name}`)
        io.emit('message', {admin: 'New message'})
	});

	client.on('disconnect', () => {
		console.log('client disconnected')
	});

	client.on('emit-message', (data) => {
		//* Emit to all clients connected
		//io.emit('emit-message', data)
		
		//* Emit to all clients except client that send the message
		client.broadcast.emit('emit-message', data)

	})

	client.on('vote-band',(data)=>{
		bands.voteBand(data.id)
		io.emit('active-bands', bands.getBands())
	});

	client.on('add-band',(data)=>{
		console.log(data.name)
		bands.addBand(new Band(data.name))
		io.emit('active-bands', bands.getBands())
	});

	client.on('delete-band',(data)=>{
		console.log(data)
		bands.deleteBand(data.id)
		io.emit('active-bands', bands.getBands())
	})
});