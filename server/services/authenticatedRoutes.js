const jwt = require('jsonwebtoken');

// Vérification de l'authentification et du role_id pour l'accès à certaines routes

function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.sendStatus(401);
    }
    jwt.verify(token, "SECRET_KEY", (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
}
  
function ensureRole(role_id) {
    return function(req, res, next) {
        if (!req.user || req.user.userId !== role_id) {
        return res.sendStatus(403);
        }
        next();
    }
}

module.exports = { ensureAuthenticated, ensureRole };