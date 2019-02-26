import http from 'http'
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(
  (req, res) => {
    console.log(request.url)
    res.end('received')
  }
)

server.listen(port, err => {
  if (err) {
    return console.log('error:', err)
  }
  console.log(`server is listening on ${port}`)
})
