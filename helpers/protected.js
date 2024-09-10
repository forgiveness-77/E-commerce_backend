const jwt = require('jsonwebtoken');
const secret = process.env.secret;

const protected = (req , res, next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }

      req.userData = { userId: decodedToken.userId };
      next();
})
}

module.exports = protected;