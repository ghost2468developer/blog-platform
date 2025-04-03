import dotenv from 'dotenv'
import express from 'express'
import authRoutes from './routes/authRoutes'
import recipeRoutes from './routes/recipeRoutes'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/recipes', recipeRoutes)

app.listen(port, () => {
  console.log(`
        Server is running on port ${port}
        Welcome to the Blog plartform
    `)
})