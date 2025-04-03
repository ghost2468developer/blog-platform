import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prisma/client'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

// Sign Up
export const signup = async (req: { body: { username: any; email: any; password: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; token?: string }): void; new(): any } } }) => {
  const { username, email, password } = req.body

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Login
export const login = async (req: { body: { email: any; password: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; token?: string }): void; new(): any } } }) => {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}