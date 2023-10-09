import instance from "./instance";

const registerIngredient = (ingredients, recipeId, originalLength = 0) => {
  const ingredientsToPush = ingredients.filter((ingredient) =>
    parseInt(ingredient.type_id, 10) !== 8
      ? ingredient.value !== "" && ingredient.name !== ""
      : ingredient.name !== ""
  );

  // need to delete the rows which may not exist anymore
  // need to make an originalLength of ingredients once we put this
  // function in another file

  if (originalLength !== 0 && ingredientsToPush.length < originalLength) {
    // on delete du back.
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
        const ingredientExist = await instance.get(
          `/ingredients/${ingredient.name}`
        );

        currentIngredient.ingredient_id = await ingredientExist.data.id;
      } catch {
        // if error, no ingredient > we create it
        await instance.post("/ingredients", { name: ingredient.name });

        const ingredientExist = await instance.get(
          `/ingredients/${ingredient.name}`
        );

        currentIngredient.ingredient_id = await ingredientExist.data.id;
      }
    }

    if (ingredient.isEdit) {
      try {
        // now we try to get a quantity from quantity table
        const quantityExist = await instance.get(
          `/quantity/${ingredient.value}/${ingredient.type_id}`
        );

        currentIngredient.quantity_id = await quantityExist.data.id;
      } catch {
        // if error, no quantity > we create it
        await instance.post("/quantity", {
          value: ingredient.value,
          type_id: ingredient.type_id,
        });

        const quantityExist = await instance.get(
          `/quantity/${ingredient.value}/${ingredient.type_id}`
        );

        currentIngredient.quantity_id = await quantityExist.data.id;
      }
    }
    console.warn(currentIngredient);

    // lastly we check if a line + recipe_id exist from recipe_ingredient_quantity
    if (ingredient.isEdit) {
      try {
        // if recipe_ingredient_quantity exist, then we update
        const recipeIngredientQuantityExist = await instance.get(
          `/recipe-ingredient-quantity/${currentIngredient.line}/${currentIngredient.recipe_id}`
        );

        await instance.put(
          `/recipe-ingredient-quantity/${recipeIngredientQuantityExist.data.id}`,
          currentIngredient
        );
      } catch {
        // if error, then we post a new row to recipe_ingredient_quantity
        await instance.post("/recipe-ingredient-quantity/", currentIngredient);
      }
    }

    // fin d'un ingrédient, fini par faire marcher grâce au try catch
  });
};

export default registerIngredient;
