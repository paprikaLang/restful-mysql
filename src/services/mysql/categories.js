


const categories = deps => {
  return {
  	all: () => {
  	   return new Promise((resolve,reject) => {
			const { connection, errorHandler } = deps
			connection.query('SELECT * FROM categories',(error,results) => {

				if (error) {
					// reject(error)
					errorHandler(error, 'failed connect to db', reject)
					return false
				}
				resolve({ pagination: {page: 1, results: results.length}, categories:results })

			})
		})
  	},
  	save: (name) => {},
  	update: (id, name) => {},
  	del: (id) => {}

  }

}



module.exports = categories