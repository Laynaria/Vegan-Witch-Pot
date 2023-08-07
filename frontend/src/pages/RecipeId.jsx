import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "@services/instance";
import Loading from "@components/Loading/Loading";
import Card from "@components/Card/Card";

export default function RecipeId() {
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      instance
        .get(`/recipes/${id}`)
        .then((result) => {
          setRecipe(result.data);
        })
        .then(() => setIsLoading(false))
        .catch((err) => {
          console.error(err);
        });
    }, 550);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="RecipeId">
          <Card recipe={recipe} />
        </section>
      )}
    </>
  );
}
