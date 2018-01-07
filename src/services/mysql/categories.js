


const categories = deps => {
  return new Promise((resolve,reject) => {
			const { connection } = deps
			connection.query('SELECT * FROM categories',(error,results) => {

				if (error) {
					reject(error)
				}
				resolve({ pagination: {page: 2, results: results.length}, categories:results })

			   })
		  })

}



module.exports = categories