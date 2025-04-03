import express from 'express'
import { createRecipe, getAllRecipes } from '../controllers/recipeController'

const router = express.Router()

router.get('/', getAllRecipes)
router.post('/', createRecipe)

export default router