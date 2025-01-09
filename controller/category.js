// Import the database connection module
const { getCollection } = require('../db.js')
const categoryController = {
  // Function to retrieve all categories
  async getAllCategories(req, res) {
    try {
       const Category= getCollection('category');
      const categories = await Category.find()
      res.status(200).json(categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  // Function to retrieve a single category by ID
  async getCategoryById(req, res) {
    try {
      const categoryId = req.params.id
      const Category= getCollection('category');
      const category = await Category.findById(categoryId)
      if (!category) {
        return res.status(404).json({ error: 'Category not found' })
      }
      res.status(200).json(category)
    } catch (error) {
      console.error('Error fetching category:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  // Function to create a new category
  async createCategory(req, res) {
    try {
      const { categoryName, description } = req.body
      const Category= getCollection('category');
      const newCategory = new Category({ categoryName, description })
      await newCategory.save()
      res
        .status(201)
        .json({
          message: 'Category created successfully',
          category: newCategory,
        })
    } catch (error) {
      console.error('Error creating category:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  // Function to update an existing category
  async updateCategory(req, res) {
    try {
      const categoryId = req.params.id
      const { categoryName, description } = req.body
      const Category= getCollection('category');
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { categoryName, description },
        { new: true },
      )
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found' })
      }
      res.status(200).json(updatedCategory)
    } catch (error) {
      console.error('Error updating category:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  // Function to delete a category
  async deleteCategory(req, res) {    try {
      const categoryId = req.params.id
      const Category= getCollection('category');
      const deletedCategory = await Category.findByIdAndDelete(categoryId)
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Category not found' })
      }
      res.status(200).json({ message: 'Category deleted successfully' })
    } catch (error) {
      console.error('Error deleting category:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
}

module.exports = categoryController
