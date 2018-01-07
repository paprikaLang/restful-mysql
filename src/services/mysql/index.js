

const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'restful_ws'
})

const categories = require('./categories')({ connection })

module.exports = categories