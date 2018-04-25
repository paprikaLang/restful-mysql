const sha1 = require('sha1')
const jwt = require('jsonwebtoken')
const auth = deps => {
  return {
  	authenticate: (email, password) => {
  	   return new Promise((resolve,reject) => {
			const { connection, errorHandler } = deps
			const queryString = 'SELECT id, email FROM users WHERE email = ? AND password = ?'
			const queryData = [email, sha1(password)]
			connection.query(queryString,queryData,(error,results) => {

				if (error || !results.length) {
					// reject(error)
					errorHandler(error, 'failed search db', reject)
					return false
				}
				const { email, id } = results[0]
				//jwt.sign(payload, secretOrPrivateKey, [options, callback])  https://jwt.io
				const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
				console.log(token)
				resolve({ token })

			})
		})
  	}
  }
}

module.exports = auth