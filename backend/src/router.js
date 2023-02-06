const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const recipeControllers = require("./controllers/recipeControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// recipes routes
router.get("/recipes", recipeControllers.browse);
router.post("/recipes", recipeControllers.add);
router.get("/recipes/:id", recipeControllers.read);

router.put("/recipes/:id", recipeControllers.edit);
router.delete("/recipes/:id", recipeControllers.destroy);

module.exports = router;
