import "./Recipes.scss";

export default function Recipes() {
  const array = [
    { id: 1, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 2, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 3, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 4, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 5, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 6, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 7, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 8, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 9, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 10, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 11, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 12, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 13, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 14, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 15, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 16, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 17, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 18, title: "recette", desc: "description", difficulty: "difficulty" },
    { id: 19, title: "recette", desc: "description", difficulty: "difficulty" },
  ];
  return (
    <section className="Recipes">
      <h1>Recipes</h1>
      {array.map((recipe) => (
        <div id="card">
          <h2>{recipe.title}</h2>
          <p>{recipe.difficulty}</p>
          <p>{recipe.desc}?</p>
        </div>
      ))}
    </section>
  );
}
