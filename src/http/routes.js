

const routes = (server) => {
	server.get('/',(req,res,next) => {
		res.send('Enjoy yourself!')
		next()
	})
	server.get('category',(req,res,next) => {
        res.send(['1','paprika'])
		next()
	})
	
	server.post('category',(req,res,next) => {
        const {name} = req.params
        res.send(name)
		next()
	})

}


module.exports = routes