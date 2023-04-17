const server = require('pushstate-server')

server.start({
  port: 7003,
  directory: './dist'
})