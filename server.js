const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// app.use(auth)
app.use(logger)

app.get('/', auth, (req, res, next) => {
    console.log('homepage here')
    res.send('Hello World!')
    console.log(`User is admin = ${req.admin}`)
})

app.get('/user', (req, res) => {
    res.send('user page here')
    console.log('users page')
})

// middleware is a thing between a server receives something and returns something out.
// so as a result this part of it is also a middleware:
//(req, res) => {
//   res.send('user page here')
// }

function auth(req, res, next) {
    if (req.query.admin === 'true') {
        console.log('auth is fine ')
        console.log(req.query) // { admin: 'true' }
        console.log(req.originalUrl) // /?admin=true
        req.admin = true
    } else {
        res.send('no auth yet')
    }
    next() // next doesn't work as return so you need to return by youself
}

function logger(req, res, next) {
    console.log('log')
    next()
}

app.listen(port, () => {})
