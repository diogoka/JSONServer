// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create()
const configs = jsonServer.defaults([readOnly=false])
// const configs = jsonServer.defaults([readOnly=false])    
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
let fs = require('fs')


server.use(middlewares)
// Add this before server.use(router)

server.use(jsonServer.bodyParser)
server.use((req, res, next)=>{
    if(req.method === 'POST'){
        fs.writeFileSync(__dirname + "./db.json", JSON.stringify(req.title))
    }
    next()
})





server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server 