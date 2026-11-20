import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET; //1. Create a secret
const expiration = "2h"; //2. Add Expiration

/*
 3. Create PayLoad 
 The payload is encoded not encrypted so it should contain non-sensitive user data
*/
export function signToken({ _id, username, email }) {
  const payload = { _id, username, email };
  // 4. Create Token
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

// middleware that runs before any protected route handler
export function authMiddleware(req, res, next) {
  let token = req.headers.authorization; //'Bearer eyJhbGciO....'

  if (token) {
    token = token.split(" ").pop().trim(); //'eyJhbGciO....'
  }

  if (!token) {
    return res.status(401).json({ message: "No token found!" });
  }

  try {
    // decoded object will contain the original payload ({ data: { _id, ... } })
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data; // add user data to the request object
    next(); // token is valid so it can move to the route handler
  } catch {
    return res.status(401).json({ message: "Invalid token!" });
  }
}