

const routes = (server) => {
	server.get('/',(req,res,next) => {
		res.send('Enjoy yourself,baby!')
		next()
	})
}


module.exports = routes