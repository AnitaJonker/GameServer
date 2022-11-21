////npx json-server --watch db.json --port 3000
const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middleware = jsonServer.defaults()
const port = orcess.env.PORT || 3000
server.use(middlewares)
server.use(router)
server.listen(port)
