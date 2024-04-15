import { useState } from "react";
import { useEffect } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "06679f261f264c9ba59afe4a04334fda";

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>

        <img className={styles.recipeImage} src={food.image} alt={food.title} />
        <div className={styles.recipeDetails}>
          <span>
            ⏰ <strong>Ready in {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            ☑️<strong> Serves {food.servings} Persons</strong>
          </span>
          <span>
            🥑
            <strong>
              {food.vegetarian ? " Vegetarian" : "Non-Vegetarian"}
            </strong>
          </span>
          <span>
            🌱<strong>{food.vegan ? "Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          ${" "}
          <span>
            <strong>
              {(food.pricePerServing / 100).toFixed(2)} Per Serving
            </strong>
          </span>
        </div>
        <h2>Ingredients</h2>
        <ItemList food={food} isLoading={isLoading} />
        <h2>Instructions</h2>

        <div className={styles.recipeInstructions}>
          <ol>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
