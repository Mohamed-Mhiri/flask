const jwt = require("jsonwebtoken");
const firebase = require('../db');
const database = firebase.database();

const isAuth = async (req, res, next) => {
  const authHeader = req.headers["x-access-token"];

  if (!authHeader) {
    return res.status(401).send("Access Denied");
  }
  
  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    const { id } = decoded;
    console.log(decoded);

    const personSnapshot = await database.ref('users').child(id).once('value');
    const personData = personSnapshot.val();

    if (personData) {
      req.person = { id };
      next();
    } else {
      res.status(400).send("Invalid Token from our database");
    }
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = isAuth;
