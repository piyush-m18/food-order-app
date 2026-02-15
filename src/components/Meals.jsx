import { useEffect, useState } from "react"
import MealItem from "./MealItem";

export default function Meals(){
    const [loadedMeal,setLoadedMeal]=useState([]);

    useEffect(()=>{
        async function fetchMeal() {
            const res=await fetch('http://localhost:3020/meals');
            if(!res.ok){
                //.....................
            }
            const meals=await res.json();
            setLoadedMeal(meals);
        }

        fetchMeal();
    },[]);

    return (<ul id="meals">
        {loadedMeal.map((meal)=>(
            <MealItem key={meal.id} meal={meal} />
        ))}
    </ul>);
}