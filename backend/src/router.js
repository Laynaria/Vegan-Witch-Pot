const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const recipeControllers = require("./controllers/recipeControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/recipes", recipeControllers.browse);
router.post("/recipes", recipeControllers.add);

module.exports = router;
