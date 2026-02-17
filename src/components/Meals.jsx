import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

const requestConfig={};

export default function Meals() {
  const {
    data: loadedMeal,
    loading,
    error,
  } = useHttp("http://localhost:3020/meals",requestConfig,[]);

  if(loading){
    <p className="center">Fetching Meals ...</p>
  }

  if(error){
    return <Error title='Failed to fetch meals' message={error} />
  }

  return (
    <ul id="meals">
      {loadedMeal.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
