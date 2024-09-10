const { getAllCategories, getCategoryById, editCategory, addCategory, deleteCategoryById } = require("../controllers/category.controller");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const protect = require('./../helpers/protected');

router.get("/",protect, getAllCategories);

router.get("/:id", getCategoryById);

router.post("/", addCategory);

router.put("/:id",editCategory );

router.delete("/:id", deleteCategoryById );

module.exports = router;
