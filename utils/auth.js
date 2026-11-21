import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expiration = "2h"; 

export function signToken({ _id, username, email }) {
  const payload = { _id, username, email };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
