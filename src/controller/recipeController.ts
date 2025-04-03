import prisma from '../prisma/client'

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        user: true,
        ratings: true,
        comments: true
      }
    })
    res.status(200).json(recipes)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Create a new recipe
export const createRecipe = async (req, res) => {
  const { title, description, ingredients, instructions, userId, imageUrl, categoryId, cuisine, mealType, dietary } = req.body

  try {
    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        ingredients,
        instructions,
        imageUrl,
        userId,
        categoryId,
        cuisine,
        mealType,
        dietary
      }
    })
    res.status(201).json(recipe)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}