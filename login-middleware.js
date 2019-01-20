// login-middleware.js
module.exports = (req, res, next) => {
    if (req.method == 'POST' && req.path == '/authenticate') {
      if (req.body.username === 'test' && req.body.password === 'test') {
        res.status(200).json({
            id: 1,
            username: 'test',
            firstName: 'Test',
            lastName: 'User',
            token: `fake-jwt-token`
        })
      } else {
        res.status(400).json({message: 'wrong password'})
      }
    } else {
      next()
    }
  }
  