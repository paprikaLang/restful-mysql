const sha1 = require('sha1')
const users = deps => {
  return {
  	all: () => {
  	   return new Promise((resolve,reject) => {
			const { connection, errorHandler } = deps
			connection.query('SELECT id, email FROM users',(error,results) => {

				if (error) {
					// reject(error)
					errorHandler(error, 'failed search db', reject)
					return false
				}
				resolve({ pagination: {page: 1, results: results.length}, users:results })

			})
		})
  	},
  	save: (email, password) => {
  		return new Promise((resolve,reject) => {
			const { connection, errorHandler } = deps
			connection.query('INSERT INTO users (email, password) VALUES (?,?)', [email,sha1(password)], (error,results) => {

				if (error) {
					// reject(error)
					errorHandler(error, `failed post ${email}`, reject)
					return false
				}
				resolve({ user: { email , id: results.insertId} })

			})
		})
  	},
  	update: (id, password) => {
  		return new Promise((resolve,reject) => {
			const { connection, errorHandler } = deps
			connection.query('UPDATE users SET password = ? WHERE id = ? ', [sha1(password), id], (error,results) => {

				if (error || !results.affectedRows) {
					// reject(error)
					errorHandler(error, `failed update  ${id}`, reject)
					return false
				}
				resolve({ user: {id}, affectedRows: results.affectedRows })

			})
		})

  	},
  	delete: (id) => {
  		return new Promise((resolve,reject) => {
			const { connection, errorHandler } = deps
			connection.query('DELETE FROM users WHERE id = ? ', [id], (error,results) => {

				if (error || !results.affectedRows) {
					// reject(error)
					errorHandler(error, `failed remove id  ${id}`, reject)
					return false
				}
				resolve({ message: `remove id ${id} success`, affectedRows: results.affectedRows})

			})
		})
  	}

  }

}

module.exports = users