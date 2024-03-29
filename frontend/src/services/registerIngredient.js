import instance from "./instance";

const registerIngredient = (ingredients, recipeId, originalLength = 0) => {
  const ingredientsToPush = ingredients.filter((ingredient) =>
    parseInt(ingredient.type_id, 10) !== 8
      ? ingredient.value !== "" && ingredient.name !== ""
      : ingredient.name !== ""
  );

  if (originalLength !== 0 && ingredients.length < originalLength) {
    // We delete rows of ingredients if they don't exist anymore after edit
    instance.delete(
      `/recipe-ingredient-quantity/${ingredientsToPush.length}/${recipeId}`
    );
  }

  ingredientsToPush.forEach(async (ingredient) => {
    const currentIngredient = {
      line: ingredient.line,
      recipe_id: recipeId,
      ingredient_id: 0,
      quantity_id: 0,
    };

    // we need some validation steps here first, checking if ingredient.name,
    // ingredient.value ne sont pas empty > ptet même une regex pour value

    if (ingredient.isEdit) {
      try {
        // try to get the ingredient from table ingredient
        let ingredientExist = await instance.get(
          `/ingredients/${ingredient.name}`
        );

        if (ingredientExist.data === "No ingredient with this name.") {
          await instance.post("/ingredients", { name: ingredient.name });

          ingredientExist = await instance.get(
            `/ingredients/${ingredient.name}`
          );
        }

        currentIngredient.ingredient_id = await ingredientExist.data.id;
      } catch {
        // if error, something
      }
    }

    if (ingredient.isEdit) {
      try {
        // now we try to get a quantity from quantity table
        let quantityExist = await instance.get(
          `/quantity/${
            ingredient.value.includes("/")
              ? ingredient.value.split("/").join(":")
              : ingredient.value
          }/${ingredient.type_id}`
        );

        if (quantityExist.data === "No quantity with these values.") {
          await instance.post("/quantity", {
            value: ingredient.value,
            type_id: ingredient.type_id,
          });

          quantityExist = await instance.get(
            `/quantity/${
              ingredient.value.includes("/")
                ? ingredient.value.split("/").join(":")
                : ingredient.value
            }/${ingredient.type_id}`
          );
        }

        currentIngredient.quantity_id = await quantityExist.data.id;
      } catch {
        // if error, something
      }
    }

    // lastly we check if a line + recipe_id exist from recipe_ingredient_quantity
    if (ingredient.isEdit && originalLength !== 0) {
      try {
        // if recipe_ingredient_quantity exist, then we update
        const recipeIngredientQuantityExist = await instance.get(
          `/recipe-ingredient-quantity/${currentIngredient.line}/${currentIngredient.recipe_id}`
        );

        if (
          recipeIngredientQuantityExist.data ===
          "No ingredient for this recipe with these values."
        ) {
          await instance.post(
            "/recipe-ingredient-quantity/",
            currentIngredient
          );
        } else {
          await instance.put(
            `/recipe-ingredient-quantity/${recipeIngredientQuantityExist.data.id}`,
            currentIngredient
          );
        }
      } catch {
        // if error, something
      }
    }

    if (ingredient.isEdit && originalLength === 0) {
      await instance.post("/recipe-ingredient-quantity/", currentIngredient);
    }

    // fin d'un ingrédient, fini par faire marcher grâce au try catch
  });
};

export default registerIngredient;
