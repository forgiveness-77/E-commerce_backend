const { Category } = require("../models/category");


const getAllCategories = async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).send(categoryList);
};

const getCategoryById =  async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found" });
  }

  res.status(200).send(category);
}

const addCategory = async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(404).send("the category connot be created!");

  res.send(category);
}

const editCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon || category.icon,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) return res.status(404).send("the category connot be updated!");

  res.send(category);
}

const deleteCategoryById = (req, res) => {
  Category.findOneAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ sucess: true, message: "the category is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  editCategory,
  deleteCategoryById
};
