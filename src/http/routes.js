
const db = require('../services/mysql')

const routes = (server) => {
	server.get('/',(req,res,next) => {
		res.send('Enjoy yourself!')
		next()
	})
	server.get('category',async (req,res,next) => {

        try{
            res.send(await db.categories().all())
            next()
        }catch(error){
            res.send(error)
            next()
        }    
	      
	})
	
	server.post('category',(req,res,next) => {
        const {name} = req.params
        res.send(name)
		next()
	})

}


module.exports = routes