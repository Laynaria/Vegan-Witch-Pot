const express = require("express");

const router = express.Router();

const path = require("path");

const multer = require("multer");

const uploadAvatar = multer({
  dest: "public/uploads/avatars",
  fileFilter: (_req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      `Error: File upload only supports the following filetypes - ${fileTypes}`
    );
    return "";
  },
});
const uploadRecipeImage = multer({
  dest: "public/uploads/recipes",
  fileFilter: (_req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      `Error: File upload only supports the following filetypes - ${fileTypes}`
    );
    return "";
  },
});

const { checkAuth, checkRole } = require("./middlewares/auth");
const uploads = require("./services/upload");

const itemControllers = require("./controllers/itemControllers");
const recipeControllers = require("./controllers/recipeControllers");
const contactControllers = require("./controllers/contactControllers");
const categoryControllers = require("./controllers/categoryControllers");
const authControllers = require("./controllers/authControllers");
const userControllers = require("./controllers/userControllers");
const recipeIngredientQuantityControllers = require("./controllers/recipeIngredientQuantityControllers");
const typeControllers = require("./controllers/typeControllers");
const ingredientControllers = require("./controllers/ingredientControllers");
const quantityControllers = require("./controllers/quantityControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// recipes routes accessible by everyone
router.get("/recipes", recipeControllers.browse);
router.get("/recipes/:id", recipeControllers.read);
router.get("/last-recipes", recipeControllers.browseLast);
router.get(
  "/recipes/ingredients/:id",
  recipeIngredientQuantityControllers.readByRecipe
);

// category routes accessible by everyone
router.get("/categories", categoryControllers.browse);

// contact routes accessible by everyone
router.post("/contacts", contactControllers.add);

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
router.get(
  "/recipes/edit/ingredients/:id",
  recipeIngredientQuantityControllers.readByRecipeForEdit
);
router.get("/type", typeControllers.browse);
router.get("/ingredients/:name", ingredientControllers.readByName);
router.post("/ingredients", ingredientControllers.add);
router.get(
  "/quantity/:value/:typeId",
  quantityControllers.readByValueAndTypeId
);
router.post("/quantity", quantityControllers.add);
router.get(
  "/recipe-ingredient-quantity/:line/:recipeId",
  recipeIngredientQuantityControllers.readByLineAndRecipeId
);
router.post(
  "/recipe-ingredient-quantity",
  recipeIngredientQuantityControllers.add
);
router.put(
  "/recipe-ingredient-quantity/:id",
  recipeIngredientQuantityControllers.edit
);
router.delete(
  "/recipe-ingredient-quantity/:line/:recipeId",
  recipeIngredientQuantityControllers.destroyByMaxLine
);

// routes for upload users avatars and recipes pictures
router.post("/check-new-recipe", recipeControllers.checkNewRecipe);
router.post(
  "/uploads/recipes/:id",
  uploadRecipeImage.single("recipePic"),
  uploads.uploadRecipePictures
);
router.post(
  "/uploads/avatars/:id",
  uploadAvatar.single("avatar"),
  uploads.uploadAvatars
);
router.put("/users/edit-avatar/:id", userControllers.editAvatar);

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

// user routes for admins only
router.get("/users", userControllers.browse);

// contact routes for admin only
router.get("/contacts", contactControllers.browse);
router.get("/contacts/:id", contactControllers.read);
router.put("/contacts/:id", contactControllers.edit);
router.delete("/contacts/:id", contactControllers.destroy);

module.exports = router;
