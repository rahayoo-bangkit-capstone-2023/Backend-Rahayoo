const admin = require('firebase-admin');

const authenticateJWT = async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    if(!idToken){
        throw new Error('No token provided')
    };
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch(error){
    res.status(401).json({message: 'Invalid Token'});
  }
};

module.exports = authenticateJWT;
