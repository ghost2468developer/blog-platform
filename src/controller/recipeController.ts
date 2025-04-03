import { $Enums } from '@prisma/client'
import prisma from '../prisma/client'

// Get all recipes
export const getAllRecipes = async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: ({ user: { id: string; createdAt: Date; updatedAt: Date; username: string; email: string; password: string }; ratings: { id: string; createdAt: Date; updatedAt: Date; userId: string; rating: number; comment: string | null; recipeId: string }[]; comments: { id: string; createdAt: Date; updatedAt: Date; userId: string; recipeId: string; content: string }[] } & { id: string; createdAt: Date; updatedAt: Date; title: string; description: string; ingredients: string; instructions: string; imageUrl: string | null; userId: string; categoryId: string | null; cuisine: $Enums.Cuisine; mealType: $Enums.MealType })[]): void; new(): any } } }) => {
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
export const createRecipe = async (req: { body: { title: any; description: any; ingredients: any; instructions: any; userId: any; imageUrl: any; categoryId: any; cuisine: any; mealType: any; dietary: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { id: string; createdAt: Date; updatedAt: Date; title: string; description: string; ingredients: string; instructions: string; imageUrl: string | null; userId: string; categoryId: string | null; cuisine: $Enums.Cuisine; mealType: $Enums.MealType }): void; new(): any } } }) => {
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