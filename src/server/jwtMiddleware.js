
const jwt = require('jsonwebtoken')

const jwtMiddleware = (deps) => {
	return  async (req,res,next) => {
        console.log(req.href())
        if (!deps.exclusions.includes(req.href())) {

            const token = req.headers['x-access-token']
			if (!token) {
				res.send(403, {error: 'Token not exist'})
				return false
			}
			try {
			   req.decoded = jwt.verify(token,process.env.JWT_SECRET)
			} catch (error) {
				res.send(403,{error: 'failed authenticate token'})
				return false
			}
			// await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
			// 	if (error) {
			// 		//控制台过多的node错误讯息
			// 		res.send(403,{error: 'failed authenticate token'})
			// 	} else {
			// 		console.log (decoded)
			// 		//没有排除在外的路由可以获取解析信息
			// 		req.decoded = decoded
			// 	}
			// })

        }
	
		next()
	}
}
module.exports = jwtMiddleware