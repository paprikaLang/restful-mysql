


const categories = deps => {
  return {
  	all: () => {
  	   return new Promise((resolve,reject) => {
			const { connection, errorHandler } = deps
			connection.query('SELECT * FROM categories',(error,results) => {

				if (error) {
					// reject(error)
					errorHandler(error, 'failed search db', reject)
					return false
				}
				resolve({ pagination: {page: 1, results: results.length}, categories:results })

			})
		})
  	},
  	save: (name) => {
  		return new Promise((resolve,reject) => {
			const { connection, errorHandler } = deps
			connection.query('INSERT INTO categories (name) VALUES (?)', [name], (error,results) => {

				if (error) {
					// reject(error)
					errorHandler(error, `failed post ${name}`, reject)
					return false
				}
				resolve({ category: { name , id: results.insertId} })

			})
		})
  	},
  	update: (id, name) => {
  		return new Promise((resolve,reject) => {
			const { connection, errorHandler } = deps
			connection.query('UPDATE categories SET name = ? WHERE id = ? ', [name, id], (error,results) => {

				if (error) {
					// reject(error)
					errorHandler(error, `failed update  ${name}`, reject)
					return false
				}
				resolve({ category: { name , id: results.insertId} })

			})
		})

  	},
  	delete: (id) => {
  		return new Promise((resolve,reject) => {
			const { connection, errorHandler } = deps
			connection.query('DELETE FROM categories WHERE id = ? ', [id], (error,results) => {

				if (error) {
					// reject(error)
					errorHandler(error, `failed remove id  ${id}`, reject)
					return false
				}
				resolve({ message: `remove id ${id} success`})

			})
		})
  	}

  }

}



module.exports = categories