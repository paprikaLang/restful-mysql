
const db = require('../services/mysql')

const routes = (server) => {

    server.post('authenticate',async (req,res,next) => {

        try{
            const { email, password } = req.params
            console.log(email,password)
            res.send(await db.auth().authenticate(email,password))
            
        }catch(error){
            res.send(error)
            
        }   
        next() 
          
    })

	server.get('categories',async (req,res,next) => {

        try{
            const categories = await db.categories().all()
            const user = req.decoded
            res.send({ categories, user })
            
        }catch(error){
            res.send(error)
            
        }   
        next() 
	      
	})
	
	server.post('category', async (req,res,next) => {
        const { name } = req.params
        try {
        	res.send(await db.categories().save(name))
        	
        }catch(error) {
            res.send(error)
             
        }
        next()

	})
	server.put('category', async (req,res,next) => {
        const { id, name } = req.params
        try {
        	res.send(await db.categories().update(id,name))
        	
        }catch(error) {
            res.send(error)
            
        }
        next()

	})
	server.del('category', async (req,res,next) => {
        const { id } = req.params
        console.log(req.params)
        try {
        	res.send(await db.categories().delete(id))
        	
        }catch(error) {
            res.send(error)
           
        }
        next()

	})
    server.get('/',(req,res,next) => {
        res.send('Enjoy yourself!')
        next()
    })

}

module.exports = routes