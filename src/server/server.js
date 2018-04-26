
const restify = require('restify')

const server = restify.createServer()

const routes = require('../http/routes')
 
const cors = require('./cors')

const jwt = require('jsonwebtoken')

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())

server.use(async (req,res,next) => {

	const token = req.headers['x-access-token']
	if (!token) {
		res.send(403, {error: 'Token not exist'})
		return false
	}
	await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
		if (error) {
			res.send(403,{error: 'failed authenticate token'})
		} else {
			console.log (decoded)
			req.decoded = decoded
		}
	})

	next()
})


routes(server)

module.exports = server