const express = require("express");

const router = express.Router();

const { checkAuth, checkRole } = require("./middlewares/auth");

const itemControllers = require("./controllers/itemControllers");
const recipeControllers = require("./controllers/recipeControllers");
const contactControllers = require("./controllers/contactControllers");
const categoryControllers = require("./controllers/categoryControllers");
const authControllers = require("./controllers/authControllers");
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
router.get("/last-recipes", recipeControllers.browseLast);

// category routes accessible by everyone
router.get("/categories", categoryControllers.browse);

// contact routes accessible by everyone
router.get("/contacts", contactControllers.browse);
router.get("/contacts/:id", contactControllers.read);

// authentification routes
router.get("/verify-email/:email", authControllers.checkEmail);
router.get("/verify-username/:username", authControllers.checkUsername);
router.post("/register", authControllers.add);
router.post("/login", authControllers.log);
router.post("/logout", authControllers.logout);

// Middleware verifying if user is logged for routes security
router.use(checkAuth);

// Users routes for authentificated users only
router.get("/users/:id", userControllers.read);
router.delete("/users/:id", userControllers.destroy);
router.put("/users/:id", userControllers.edit);
router.put("/users/edit-password/:id", userControllers.editPassword);

// recipe routes for authentificated users only
router.post("/recipes", recipeControllers.add);
router.put("/recipes/:id", recipeControllers.edit);

// recipes routes used to delete recipes and users
router.get("/users/delete-info/:id", userControllers.selectForDelete);
router.delete(
  "/recipe/delete-info/",
  recipeIngredientQuantityControllers.destroy
);
router.delete("/recipes/:id", recipeControllers.destroy);
router.delete("/users/recipes/:id", recipeControllers.destroyByUser);
router.delete("/users/:id", userControllers.destroy);

// Middleware for checking roles
router.use(checkRole);

// routes accessible des admin uniquement
router.get("/users", userControllers.browse);

module.exports = router;
