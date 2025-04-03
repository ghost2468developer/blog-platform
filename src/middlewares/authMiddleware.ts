import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(403).json({ message: 'Access denied' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}