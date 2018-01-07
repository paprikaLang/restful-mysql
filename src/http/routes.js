

const routes = (server) => {
	server.get('/',(req,res,next) => {
		res.send('Enjoy yourself!')
		next()
	})
}


module.exports = routes