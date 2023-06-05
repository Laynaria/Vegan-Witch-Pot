const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const recipeControllers = require("./controllers/recipeControllers");
const userControllers = require("./controllers/userControllers");
const recipeIngredientQuantityControllers = require("./controllers/recipeIngredientQuantityControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// recipes routes accessible by everyone
router.get("/recipes", recipeControllers.browse);
router.get("/recipes/:id", recipeControllers.read);

// authentification routes
// router.post("/register", userControllers.add);
// router.post("/login", userControllers.log);

// recipe routes for authentificated users only
router.post("/recipes", recipeControllers.add);
router.put("/recipes/:id", recipeControllers.edit);

router.get("/users/delete-info/:id", userControllers.selectForDelete);
router.delete(
  "/recipe/delete-info/",
  recipeIngredientQuantityControllers.destroy
);
router.delete("/recipes/:id", recipeControllers.destroy);

// routes accessible des admin uniquement
// router.get("/users", userControllers.browse);
// router.get("/users/:id", userControllers.read);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
